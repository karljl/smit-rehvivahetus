from typing import List

from fastapi import HTTPException

from app.adapters.base import WorkshopAPI
from app.core.models import Body


async def book_workshop_time(body: Body, adapters: List[WorkshopAPI]):
    """Attempts to book a time slot at the specified workshop."""
    workshop = None
    for adapter in adapters:
        if adapter.get_name() == body.workshop:
            workshop = adapter

    if workshop is None:
        raise HTTPException(status_code=404, detail=f'Workshop {body.workshop} not found')

    return await workshop.book_slot(str(body.id), body.contact_info)
