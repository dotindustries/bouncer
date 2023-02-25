import dataclasses
import dateutil.parser
from dataclasses_json import dataclass_json
from datetime import datetime
from enum import Enum
from marshmallow import fields
from sdk import utils
from typing import Optional


@dataclasses.dataclass
class MutationSeatsUpdateuOccupantPathParams:
    seat_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'seatId', 'style': 'simple', 'explode': False }})
    subscription_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'subscriptionId', 'style': 'simple', 'explode': False }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupantRequestBodyUser:
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    email: Optional[str] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    user_name: Optional[str] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_name') }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupantRequestBody:
    user: MutationSeatsUpdateuOccupantRequestBodyUser = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user') }})
    

@dataclasses.dataclass
class MutationSeatsUpdateuOccupantRequest:
    path_params: MutationSeatsUpdateuOccupantPathParams = dataclasses.field()
    request: MutationSeatsUpdateuOccupantRequestBody = dataclasses.field(metadata={'request': { 'media_type': 'application/json' }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupantDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[MutationSeatsUpdateuOccupantDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupant200ApplicationJSONOccupant:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    user_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_name') }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupant200ApplicationJSONReservation:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    invite_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('invite_url') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    
class MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum(str, Enum):
    STANDARD = "standard"
    LIMITED = "limited"

class MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum(str, Enum):
    MONTHLY_ACTIVE_USER = "monthly_active_user"
    FIRST_COME_FIRST_SERVED = "first_come_first_served"


@dataclass_json
@dataclasses.dataclass
class MutationSeatsUpdateuOccupant200ApplicationJSON:
    created_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('created_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    expires_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('expires_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('id') }})
    occupant: MutationSeatsUpdateuOccupant200ApplicationJSONOccupant = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('occupant') }})
    redeemed_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('redeemed_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    reservation: MutationSeatsUpdateuOccupant200ApplicationJSONReservation = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('reservation') }})
    seat_type: MutationSeatsUpdateuOccupant200ApplicationJSONSeatTypeEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_type') }})
    seating_strategy_name: MutationSeatsUpdateuOccupant200ApplicationJSONSeatingStrategyNameEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seating_strategy_name') }})
    subscription_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('subscription_id') }})
    

@dataclasses.dataclass
class MutationSeatsUpdateuOccupantResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    mutation_seats_updateu_occupant_200_application_json_object: Optional[MutationSeatsUpdateuOccupant200ApplicationJSON] = dataclasses.field(default=None)
    mutation_seats_updateu_occupant_default_application_json_object: Optional[MutationSeatsUpdateuOccupantDefaultApplicationJSON] = dataclasses.field(default=None)
    