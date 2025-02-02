from datetime import datetime
from typing import List, Optional

from app.adapters.base import WorkshopAPI
from app.core.filters import (
    MultipleTypeSpecification, WorkshopSpecification,
    TimeSpecification, VehicleTypeSpecification, response_filter
)
from app.core.models import SlotQuery, VehicleType
from app.core.utils import convert_to_utc, get_default_dates, convert_workshop_names


async def get_filtered_slots(
        workshop: Optional[List[str]],
        from_date: Optional[datetime],
        until_date: Optional[datetime],
        vehicle_types: Optional[List[VehicleType]],
        limit: Optional[int],
        offset: Optional[int],
        adapters: List[WorkshopAPI]
):
    # Normalize query parameters
    query = SlotQuery(
        from_date=from_date,
        until_date=until_date,
        workshops=workshop,
        vehicle_types=vehicle_types,
        limit=limit,
        offset=offset
    )

    query.from_date, query.until_date = (
        convert_to_utc(dt) for dt in get_default_dates(query.from_date, query.until_date)
    )

    # Extend `until_date` to cover the full day if only date is provided
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
    if query.vehicle_types:
        specifications.append(VehicleTypeSpecification(query.vehicle_types))

    filter_by = MultipleTypeSpecification(specifications)

    # Fetch slots from adapters
    slots = [
        slot
        for adapter in adapters
        for slot in await adapter.get_available_slots(query)
    ]

    # Apply filtering
    result = response_filter(sorted(slots, key=lambda slot: slot.time), filter_by)

    # Apply limit and offset
    start, end = 0, -1
    if query.limit is not None:
        end = query.limit
        if query.offset is not None:
            start = query.offset * query.limit
            end = start + query.limit

    return list(result)[start:end]
