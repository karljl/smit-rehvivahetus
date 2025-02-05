from datetime import datetime
from itertools import islice
from typing import List, Optional

from app.adapters.base import WorkshopAPI
from app.core.filters import (
    MultipleTypeSpecification, WorkshopSpecification,
    TimeSpecification, VehicleTypeSpecification, response_filter
)
from app.core.models import SlotQuery, VehicleType
from app.core.utils import convert_to_utc, convert_workshop_names


async def get_filtered_slots(
        workshop: Optional[List[str]],
        from_date: Optional[datetime],
        until_date: Optional[datetime],
        vehicle_type: Optional[VehicleType],
        limit: Optional[int],
        adapters: List[WorkshopAPI]
):
    # Normalize query parameters
    query = SlotQuery(
        from_date=from_date,
        until_date=until_date,
        workshops=workshop,
        vehicle_type=vehicle_type,
        limit=limit
    )

    query.from_date, query.until_date = (
        convert_to_utc(dt) for dt in (query.from_date, query.until_date)
    )

    # Extend `until_date` to cover the full day
    if query.until_date.hour == 0 and query.until_date.minute == 0 and query.until_date.second == 0:
        query.until_date = query.until_date.replace(hour=23, minute=59, second=59, microsecond=999999)

    # Filter adapters based on workshops
    workshops = None
    if query.workshops:
        workshops = convert_workshop_names(query.workshops)
        adapters = [adapter for adapter in adapters if adapter.get_name() in workshops]

    # Define filtering specifications
    specifications = [TimeSpecification(query.from_date, query.until_date)]

    if workshops:
        specifications.append(WorkshopSpecification(workshops))
    if query.vehicle_type:
        specifications.append(VehicleTypeSpecification(query.vehicle_type))

    filter_by = MultipleTypeSpecification(specifications)

    # Fetch slots from adapters
    slots = [
        slot
        for adapter in adapters
        for slot in await adapter.get_available_slots(query)
    ]

    # Apply filtering
    filtered_results = response_filter(sorted(slots, key=lambda slot: slot.time), filter_by)

    if query.limit is not None:
        filtered_results = list(islice(filtered_results, query.limit))

    return filtered_results
