from typing import Dict, List

from fastapi import HTTPException

from app.adapters.base import WorkshopAPI, Slot
from app.core.models import SlotQuery
from app.core.utils import build_url, xml_to_json, parse_error_message, format_datetime


class LondonAPI(WorkshopAPI):
    async def get_available_slots(self, query: SlotQuery) -> List[Slot]:
        url = build_url(self.get_endpoint_config())
        response = await self._client.get(url, params={'from': format_datetime(query.from_date), 'until': format_datetime(query.until_date)})

        if response.status_code == 200:
            slots = xml_to_json(response.text)

            output: List[Slot] = []
            for slot in slots:
                output.append(Slot(workshop=self.get_name(), address=self.get_workshop_config().address, vehicle_types=self.get_workshop_config().vehicle_types, id=slot['id'], time=slot['time']))
            return output

        raise HTTPException(status_code=response.status_code, detail=parse_error_message(response.text))

    async def book_slot(self, slot_id: str, contact_info: str) -> Dict:
        url = build_url(self.get_endpoint_config(), id_=slot_id)
        data = f'<?xml version="1.0" encoding="UTF-8"?><london.tireChangeBookingRequest><contactInformation>{contact_info}</contactInformation></london.tireChangeBookingRequest>'
        response = await self._client.put(url, content=data, headers={"Content-Type": "application/xml"})

        if response.status_code == 200:
            return xml_to_json(response.text)

        raise HTTPException(status_code=response.status_code, detail=parse_error_message(response.text))
