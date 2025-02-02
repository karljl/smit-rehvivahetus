from typing import List, Dict

from fastapi import HTTPException

from app.adapters.base import WorkshopAPI, Slot
from app.core.models import SlotQuery
from app.core.utils import build_url, parse_error_message, format_datetime


class ManchesterAPI(WorkshopAPI):
    async def get_available_slots(self, query: SlotQuery) -> List[Slot]:
        url = build_url(self.get_endpoint_config())
        response = await self._client.get(url, params={'amount': max(query.limit, 0), 'page': max(query.offset, 0), 'from': format_datetime(query.from_date)})

        if response.status_code == 200:
            slots = response.json()

            output: List[Slot] = []
            for slot in slots:
                if slot['available']:
                    output.append(Slot(workshop=self.get_name(), address=self.get_workshop_config().address, vehicle_types=self.get_workshop_config().vehicle_types, id=slot['id'], time=slot['time']))
            return output

        raise HTTPException(status_code=response.status_code, detail=parse_error_message(response.text))

    async def book_slot(self, slot_id: str, contact_info: str) -> Dict:
        url = build_url(self.get_endpoint_config(), id_=slot_id)
        data = {'contactInformation': contact_info}
        response = await self._client.post(url, json=data, headers={"Content-Type": "application/json"})

        if response.status_code == 200:
            return response.json()

        raise HTTPException(status_code=response.status_code, detail=parse_error_message(response.text))
