from typing import List

from fastapi import Request

from app.adapters.base import WorkshopAPI


def get_adapters(request: Request) -> List[WorkshopAPI]:
    return request.app.state.adapters
