import pytest
from datetime import datetime, timedelta

@pytest.fixture(scope="module")
def booking_queries():
    """Provides pre-defined queries for different workshops."""
    return {
        "manchester": {
            "workshop": ["Manchester Tire Workshop"],
            "from_date": datetime.now(),
            "until_date": datetime.now() + timedelta(weeks=1),
            "vehicle_type": "passenger_car",
        },
        "london": {
            "workshop": ["London Tire Workshop"],
            "from_date": datetime.now(),
            "until_date": datetime.now() + timedelta(weeks=1),
            "vehicle_type": "passenger_car",
        },
    }

@pytest.mark.asyncio
async def test_book_workshop_time_manchester(client, booking_queries):
    response = client.get("/api/available-times", params=booking_queries["manchester"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 200

@pytest.mark.asyncio
async def test_book_workshop_time_london(client, booking_queries):
    response = client.get("/api/available-times", params=booking_queries["london"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 200

@pytest.mark.asyncio
async def test_book_workshop_multiple_time_manchester(client, booking_queries):
    response = client.get("/api/available-times", params=booking_queries["manchester"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 200

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 422

@pytest.mark.asyncio
async def test_book_workshop_multiple_time_london(client, booking_queries):
    """ Since time booking for london is a PUT request, sending the exact same data multiple times gets response 200. If contact info is changed, we receive the expected 422 """

    response = client.get("/api/available-times", params=booking_queries["london"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 200

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 200

    post_response = client.post('/api/book-time', json={"id": slot["id"], "workshop": slot["workshop"], "contact_info": "John Doe Second"})
    assert post_response.status_code == 422


@pytest.mark.asyncio
async def test_book_workshop_invalid_id(client, booking_queries):
    response = client.get("/api/available-times", params=booking_queries["manchester"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": "blabla", "workshop": slot["workshop"], "contact_info": "John Doe"})
    assert post_response.status_code == 400


@pytest.mark.asyncio
async def test_book_workshop_missing_contact_info(client, booking_queries):
    response = client.get("/api/available-times", params=booking_queries["london"])
    slot = response.json()[0]

    post_response = client.post('/api/book-time', json={"id": "blabla", "workshop": slot["workshop"], "contact_info": ''})
    assert post_response.status_code == 400


@pytest.mark.asyncio
async def test_book_workshop_not_existing_workshop(client, booking_queries):
    post_response = client.post('/api/book-time', json={"id": "blabla", "workshop": "New York", "contact_info": ''})
    assert post_response.status_code == 404
