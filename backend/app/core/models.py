from datetime import datetime
from enum import Enum
from typing import List, Union, Optional

from pydantic import BaseModel


class VehicleType(str, Enum):
    PASSENGER_CAR = 'passenger_car'
    TRUCK = 'truck'


class SlotQuery(BaseModel):
    workshops: Optional[List[str]]
    from_date: Optional[datetime]
    until_date: Optional[datetime]
    vehicle_type: Optional[VehicleType]
    limit: Optional[int]


class Slot(BaseModel):
    workshop: str
    address: str
    vehicle_types: List[VehicleType]
    id: Union[str, int]
    time: datetime


class Body(BaseModel):
    id: Union[str, int]
    workshop: str
    contact_info: str


class Config(BaseModel):
    name: str


class EndpointsConfig(Config):
    protocol: str
    host: str
    port: str
    root: str
    available_times: str
    book_time: str


class WorkshopsConfig(Config):
    address: str
    vehicle_types: List[VehicleType]
