import abc
from datetime import datetime
from typing import List, Optional

from app.adapters.base import Slot
from app.core.models import VehicleType


class Specification(abc.ABC):
    @abc.abstractmethod
    def is_satisfied(self, item: Slot):
        pass


class WorkshopSpecification(Specification):
    def __init__(self, workshops: Optional[List[str]] = None):
        self._workshops = workshops

    def is_satisfied(self, item: Slot):
        if self._workshops:
            return item.workshop in self._workshops
        return True


class TimeSpecification(Specification):
    def __init__(self, from_date: Optional[datetime] = None, until_date: Optional[datetime] = None):
        self._from_date = from_date
        self._until_date = until_date

    def is_satisfied(self, item: Slot):
        if self._from_date and self._until_date:
            return self._from_date <= item.time <= self._until_date
        elif self._from_date:
            return self._from_date <= item.time
        elif self._until_date:
            return item.time <= self._until_date
        return True


class VehicleTypeSpecification(Specification):
    def __init__(self, vehicle_types: Optional[List[VehicleType]] = None):
        self._vehicle_types = vehicle_types

    def is_satisfied(self, item: Slot):
        if self._vehicle_types:
            for vehicle_type in self._vehicle_types:
                if vehicle_type not in item.vehicle_types:
                    return False
        return True


class MultipleTypeSpecification(Specification):
    def __init__(self, specifications: List[Specification]):
        self._specifications = specifications

    def is_satisfied(self, item: Slot):
        return all(map(lambda spec: spec.is_satisfied(item), self._specifications))


def response_filter(items: List[Slot], specification: Specification):
    for item in items:
        if specification.is_satisfied(item):
            yield item
