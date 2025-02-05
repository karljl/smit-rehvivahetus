import pytest
from datetime import datetime, timedelta


@pytest.mark.asyncio
async def test_get_available_times_london(client):

    query = {
        'workshop': ['London Tire Workshop'],
        'from_date': datetime.now(),
        'until_date': datetime.now() + timedelta(weeks=1),
        'vehicle_type': 'passenger_car',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_available_times_multiple(client):

    query = {
        'workshop': ['London Tire Workshop', 'Manchester Tire Workshop'],
        'from_date': datetime.now(),
        'until_date': datetime.now() + timedelta(weeks=1),
        'vehicle_type': 'passenger_car',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_available_truck_times_london(client):
    # London has no truck service

    query = {
        'workshop': ['London Tire Workshop'],
        'from_date': datetime.now(),
        'until_date': datetime.now() + timedelta(weeks=1),
        'vehicle_type': 'truck',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 0


@pytest.mark.asyncio
async def test_get_available_times_manchester(client):

    query = {
        'workshop': ['Manchester Tire Workshop'],
        'from_date': datetime.now(),
        'until_date': datetime.now() + timedelta(weeks=1),
        'vehicle_type': 'truck',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_available_times_unknown_adapter(client):

    query = {
        'workshop': ['New York Tire Workshop'],
        'from_date': datetime.now(),
        'until_date': datetime.now() + timedelta(weeks=1),
        'vehicle_type': 'truck',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_available_times_invalid_date_range(client):

    query = {
        'workshop': ['London Tire Workshop'],
        'from_date': datetime.now() + timedelta(weeks=1),
        'until_date': datetime.now(),
        'vehicle_type': 'truck',
    }

    response = client.get("/api/available-times", params=query)

    assert response.status_code == 409
