import pytest
from fastapi.testclient import TestClient

from app.adapters.london import LondonAPI
from app.adapters.manchester import ManchesterAPI
from app.main import app

@pytest.fixture(scope="module")
def client():
    app.state.adapters = [LondonAPI, ManchesterAPI]
    with TestClient(app) as client:
        yield client
