import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from httpx import AsyncClient

from app.adapters.base import WorkshopAPI
from app.adapters.london import LondonAPI
from app.adapters.manchester import ManchesterAPI
from app.core.config_manager import ConfigManager
from app.routes.slots import router as available_times_router
from app.routes.booking import router as book_time_router


def create_adapters(client: AsyncClient, config_manager: ConfigManager) -> List[WorkshopAPI]:
    adapters_map = {
        "London Tire Workshop": LondonAPI,
        "Manchester Tire Workshop": ManchesterAPI
    }

    adapters: List[WorkshopAPI] = []
    for adapter_name in adapters_map.keys():
        adapters.append(adapters_map[adapter_name](adapter_name, client, config_manager))

    return adapters


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown lifecycle."""
    client = AsyncClient()
    config_manager = ConfigManager(Path(os.getcwd(), 'configs'))
    app.state.adapters = create_adapters(client, config_manager)
    yield

    await client.aclose()


app = FastAPI(lifespan=lifespan)

app.include_router(book_time_router)
app.include_router(available_times_router)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
