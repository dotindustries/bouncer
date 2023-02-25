import dataclasses
import dateutil.parser
from dataclasses_json import dataclass_json
from datetime import datetime
from enum import Enum
from marshmallow import fields
from sdk import utils
from typing import Optional


@dataclasses.dataclass
class QuerySeatsByIDPathParams:
    seat_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'seatId', 'style': 'simple', 'explode': False }})
    subscription_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'subscriptionId', 'style': 'simple', 'explode': False }})
    

@dataclasses.dataclass
class QuerySeatsByIDRequest:
    path_params: QuerySeatsByIDPathParams = dataclasses.field()
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsByIDDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsByIDDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[QuerySeatsByIDDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsByID200ApplicationJSONOccupant:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    user_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_name') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsByID200ApplicationJSONReservation:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    invite_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('invite_url') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    
class QuerySeatsByID200ApplicationJSONSeatTypeEnum(str, Enum):
    STANDARD = "standard"
    LIMITED = "limited"

class QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum(str, Enum):
    MONTHLY_ACTIVE_USER = "monthly_active_user"
    FIRST_COME_FIRST_SERVED = "first_come_first_served"


@dataclass_json
@dataclasses.dataclass
class QuerySeatsByID200ApplicationJSON:
    created_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('created_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    expires_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('expires_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('id') }})
    occupant: QuerySeatsByID200ApplicationJSONOccupant = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('occupant') }})
    redeemed_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('redeemed_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    reservation: QuerySeatsByID200ApplicationJSONReservation = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('reservation') }})
    seat_type: QuerySeatsByID200ApplicationJSONSeatTypeEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_type') }})
    seating_strategy_name: QuerySeatsByID200ApplicationJSONSeatingStrategyNameEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seating_strategy_name') }})
    subscription_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('subscription_id') }})
    

@dataclasses.dataclass
class QuerySeatsByIDResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    query_seats_by_id_200_application_json_object: Optional[QuerySeatsByID200ApplicationJSON] = dataclasses.field(default=None)
    query_seats_by_id_default_application_json_object: Optional[QuerySeatsByIDDefaultApplicationJSON] = dataclasses.field(default=None)
    