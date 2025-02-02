from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, Query

from app.adapters.base import WorkshopAPI
from app.core.dependencies import get_adapters
from app.core.models import VehicleType
from app.services.slots_service import get_filtered_slots

router = APIRouter()


@router.get('/available-times')
async def get_available_times(
        workshop: Optional[List[str]] = Query(None),
        from_date: Optional[datetime] = Query(None),
        until_date: Optional[datetime] = Query(None),
        vehicle_types: Optional[List[VehicleType]] = Query(None),
        limit: Optional[int] = Query(100),
        offset: Optional[int] = Query(0),
        adapters: List[WorkshopAPI] = Depends(get_adapters)
):
    return await get_filtered_slots(
        workshop, from_date, until_date, vehicle_types, limit, offset, adapters
    )
