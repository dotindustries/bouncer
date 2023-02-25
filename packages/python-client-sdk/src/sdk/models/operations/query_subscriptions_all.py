import dataclasses
import dateutil.parser
from dataclasses_json import dataclass_json
from datetime import datetime
from enum import Enum
from marshmallow import fields
from sdk import utils
from typing import Any, Optional


@dataclasses.dataclass
class QuerySubscriptionsAllQueryParams:
    product_id: str = dataclasses.field(metadata={'query_param': { 'field_name': 'productId', 'style': 'form', 'explode': True }})
    

@dataclasses.dataclass
class QuerySubscriptionsAllRequest:
    query_params: QuerySubscriptionsAllQueryParams = dataclasses.field()
    

@dataclass_json
@dataclasses.dataclass
class QuerySubscriptionsAllDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class QuerySubscriptionsAllDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[QuerySubscriptionsAllDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    
class QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum(str, Enum):
    MONTHLY_ACTIVE_USER = "monthly_active_user"
    FIRST_COME_FIRST_SERVED = "first_come_first_served"


@dataclass_json
@dataclasses.dataclass
class QuerySubscriptionsAll200ApplicationJSONSeatingConfig:
    default_low_seat_warning_level_percent: float = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('default_low_seat_warning_level_percent') }})
    limited_overflow_seating_enabled: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('limited_overflow_seating_enabled') }})
    low_seat_warning_level_pct: float = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('low_seat_warning_level_pct') }})
    owner_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('owner_id') }})
    seating_strategy_name: QuerySubscriptionsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seating_strategy_name') }})
    default_seat_expiry_in_days: Optional[float] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('default_seat_expiry_in_days') }})
    seat_reservation_expiry_in_days: Optional[float] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_reservation_expiry_in_days') }})
    
class QuerySubscriptionsAll200ApplicationJSONStateEnum(str, Enum):
    PURCHASED = "purchased"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    CANCELED = "canceled"


@dataclass_json
@dataclasses.dataclass
class QuerySubscriptionsAll200ApplicationJSON:
    admin_email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('admin_email') }})
    admin_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('admin_name') }})
    admin_role_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('admin_role_name') }})
    created_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('created_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('id') }})
    is_being_configured: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('is_being_configured') }})
    is_free_trial: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('is_free_trial') }})
    is_setup_complete: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('is_setup_complete') }})
    is_test_subscription: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('is_test_subscription') }})
    offer_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('offer_id') }})
    plan_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('plan_id') }})
    product_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('product_id') }})
    seating_config: QuerySubscriptionsAll200ApplicationJSONSeatingConfig = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seatingConfig') }})
    state: QuerySubscriptionsAll200ApplicationJSONStateEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('state') }})
    state_last_updated_utc: datetime = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('state_last_updated_utc'), 'encoder': utils.datetimeisoformat(False), 'decoder': dateutil.parser.isoparse, 'mm_field': fields.DateTime(format='iso') }})
    subscription_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('subscription_name') }})
    tenant_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_id') }})
    tenant_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('tenant_name') }})
    total_seats: int = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('total_seats') }})
    user_role_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('user_role_name') }})
    management_urls: Optional[Any] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('management_urls') }})
    source_subscription: Optional[Any] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('source_subscription') }})
    subscriber_info: Optional[Any] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('subscriber_info') }})
    

@dataclasses.dataclass
class QuerySubscriptionsAllResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    query_subscriptions_all_200_application_json_objects: Optional[list[QuerySubscriptionsAll200ApplicationJSON]] = dataclasses.field(default=None)
    query_subscriptions_all_default_application_json_object: Optional[QuerySubscriptionsAllDefaultApplicationJSON] = dataclasses.field(default=None)
    