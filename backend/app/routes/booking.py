from typing import List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_adapters
from app.adapters.base import WorkshopAPI
from app.core.models import Body
from app.services.booking_service import book_workshop_time

router = APIRouter()

@router.post('/book-time')
async def book_time(body: Body, adapters: List[WorkshopAPI] = Depends(get_adapters)):
    return await book_workshop_time(body, adapters)
