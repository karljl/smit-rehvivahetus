import re
from datetime import datetime
from typing import Optional, List

import pytz

from app.core.models import EndpointsConfig


def build_url(endpoints_config: EndpointsConfig, id_: Optional[str] = None):
    url = [f'{endpoints_config.protocol}://{endpoints_config.host}:{endpoints_config.port}', endpoints_config.root]

    if id_ is not None:
        # PUT/POST
        path = re.sub(r"\{(id|uuid)}", id_, endpoints_config.book_time)
    else:
        # GET
        path = endpoints_config.available_times

    if path:
        url.append(path)

    return '/'.join(url)


def xml_to_json(text: str):
    pattern = r"<uuid>(.*?)<\/uuid><time>(.*?)<\/time>"
    return [{"id": match[0], "time": match[1]} for match in re.findall(pattern, text)]


def convert_to_utc(date: datetime) -> datetime:
    """Convert naive date to UTC to ensure that all times are timezone aware."""
    if date.tzinfo is None:
        return date.replace(tzinfo=pytz.utc)
    return date.astimezone(pytz.utc)


def str_to_datetime(text: str, date_format: str) -> datetime:
    return convert_to_utc(datetime.strptime(text, date_format))


def format_datetime(date_time: datetime):
    """Format datetime to match the expected 'YYYY-MM-DD' format required by external APIs."""
    return date_time.strftime('%Y-%m-%d')


def convert_workshop_names(workshops: List[str]) -> List[str]:
    """Convert workshop query string to proper format (e.g., 'london-tire-workshop' -> 'London Tire Workshop')."""
    return [workshop.replace('-', ' ').title() for workshop in workshops]


def parse_error_message(message: str) -> str | None:
    match = re.search(r'"message":"([^"]+)"', message)
    if match:
        return match.group(1).capitalize()
    return None
