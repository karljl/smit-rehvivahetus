import abc
from typing import List, Dict, Optional

from httpx import AsyncClient

from app.core.config_manager import ConfigManager
from app.core.models import Slot, EndpointsConfig, WorkshopsConfig, SlotQuery


class WorkshopAPI(abc.ABC):
    def __init__(self, name: str, client: AsyncClient, config_manager: ConfigManager):
        self._name = name
        self._client = client
        self._config_manager = config_manager
        self._endpoint_config: Optional[EndpointsConfig] = None
        self._workshop_config: Optional[WorkshopsConfig] = None

    @abc.abstractmethod
    async def get_available_slots(self, query: Optional[SlotQuery]) -> List[Slot]:
        pass

    @abc.abstractmethod
    async def book_slot(self, slot_id: str, contact_info: str) -> Dict:
        pass

    def get_name(self):
        return self._name

    def get_workshop_config(self) -> Optional[WorkshopsConfig]:
        if self._workshop_config is None:
            self._workshop_config = self._config_manager.get_workshop_config(self.get_name())
        return self._workshop_config

    def get_endpoint_config(self) -> Optional[EndpointsConfig]:
        if self._endpoint_config is None:
            self._endpoint_config = self._config_manager.get_endpoint_config(self.get_name())
        return self._endpoint_config
