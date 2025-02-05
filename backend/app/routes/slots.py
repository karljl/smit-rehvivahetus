from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, Query, HTTPException

from app.adapters.base import WorkshopAPI
from app.core.dependencies import get_adapters
from app.core.models import VehicleType
from app.core.utils import convert_workshop_names
from app.services.slots_service import get_filtered_slots

router = APIRouter()


@router.get('/available-times')
async def get_available_times(
        workshop: Optional[List[str]] = Query(None),
        from_date: Optional[datetime] = Query(None),
        until_date: Optional[datetime] = Query(None),
        vehicle_type: Optional[VehicleType] = Query(None),
        limit: Optional[int] = Query(None),
        adapters: List[WorkshopAPI] = Depends(get_adapters)
):
    adapter_names = list(map(lambda adapter: adapter.get_name(), adapters))
    for ws in convert_workshop_names(workshop):
        if ws not in adapter_names:
            raise HTTPException(status_code=404, detail=f'Workshop {ws} not found')

    if until_date < from_date:
        raise HTTPException(status_code=409, detail=f'Until date has to be later than from date')

    return await get_filtered_slots(workshop, from_date, until_date, vehicle_type, limit, adapters)
