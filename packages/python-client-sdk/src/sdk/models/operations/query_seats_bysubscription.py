import dataclasses
import dateutil.parser
from dataclasses_json import dataclass_json
from datetime import datetime
from enum import Enum
from marshmallow import fields
from sdk import utils
from typing import Optional


@dataclasses.dataclass
class QuerySeatsBySubscriptionPathParams:
    subscription_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'subscriptionId', 'style': 'simple', 'explode': False }})
    

@dataclasses.dataclass
class QuerySeatsBySubscriptionQueryParams:
    user_email: Optional[str] = dataclasses.field(default=None, metadata={'query_param': { 'field_name': 'userEmail', 'style': 'form', 'explode': True }})
    user_id: Optional[str] = dataclasses.field(default=None, metadata={'query_param': { 'field_name': 'userId', 'style': 'form', 'explode': True }})
    

@dataclasses.dataclass
class QuerySeatsBySubscriptionRequest:
    path_params: QuerySeatsBySubscriptionPathParams = dataclasses.field()
    query_params: QuerySeatsBySubscriptionQueryParams = dataclasses.field()
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsBySubscriptionDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsBySubscriptionDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[QuerySeatsBySubscriptionDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsBySubscription200ApplicationJSONOccupant:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    user_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_name') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySeatsBySubscription200ApplicationJSONReservation:
    email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('email') }})
    invite_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('invite_url') }})
    seat_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_id') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    user_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_id') }})
    
class QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum(str, Enum):
    STANDARD = "standard"
    LIMITED = "limited"

class QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum(str, Enum):
    MONTHLY_ACTIVE_USER = "monthly_active_user"
    FIRST_COME_FIRST_SERVED = "first_come_first_served"


@dataclass_json
@dataclasses.dataclass
class QuerySeatsBySubscription200ApplicationJSON:
    created_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('created_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    expires_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('expires_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('id') }})
    occupant: QuerySeatsBySubscription200ApplicationJSONOccupant = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('occupant') }})
    redeemed_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('redeemed_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    reservation: QuerySeatsBySubscription200ApplicationJSONReservation = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('reservation') }})
    seat_type: QuerySeatsBySubscription200ApplicationJSONSeatTypeEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_type') }})
    seating_strategy_name: QuerySeatsBySubscription200ApplicationJSONSeatingStrategyNameEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seating_strategy_name') }})
    subscription_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('subscription_id') }})
    

@dataclasses.dataclass
class QuerySeatsBySubscriptionResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    query_seats_by_subscription_200_application_json_objects: Optional[list[QuerySeatsBySubscription200ApplicationJSON]] = dataclasses.field(default=None)
    query_seats_by_subscription_default_application_json_object: Optional[QuerySeatsBySubscriptionDefaultApplicationJSON] = dataclasses.field(default=None)
    