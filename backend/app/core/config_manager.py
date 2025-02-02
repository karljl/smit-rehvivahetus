import json
from pathlib import Path
from typing import Optional

from app.core.models import EndpointsConfig, WorkshopsConfig


class ConfigManager:
    def __init__(self, config_dir: Path):
        self._config_dir = config_dir

    def _load_config(self, filename: str) -> dict:
        file_path = f"{self._config_dir}/{filename}"
        with open(file_path, 'r') as file:
            return json.loads(file.read())

    def get_workshop_config(self, name: str) -> Optional[WorkshopsConfig]:
        workshop_configs = self._load_config('workshops.json')
        for config in workshop_configs:
            if config.get('name') == name:
                return WorkshopsConfig(**config)
        return None

    def get_endpoint_config(self, name: str) -> Optional[EndpointsConfig]:
        endpoint_configs = self._load_config('endpoints.json')
        for config in endpoint_configs:
            if config.get('name') == name:
                return EndpointsConfig(**config)
        return None
