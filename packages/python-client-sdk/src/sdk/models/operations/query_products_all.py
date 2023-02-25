import dataclasses
from dataclasses_json import dataclass_json
from enum import Enum
from sdk import utils
from typing import Optional


@dataclass_json
@dataclasses.dataclass
class QueryProductsAllDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class QueryProductsAllDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[QueryProductsAllDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    
class QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum(str, Enum):
    MONTHLY_ACTIVE_USER = "monthly_active_user"
    FIRST_COME_FIRST_SERVED = "first_come_first_served"


@dataclass_json
@dataclasses.dataclass
class QueryProductsAll200ApplicationJSONSeatingConfig:
    default_low_seat_warning_level_percent: float = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('default_low_seat_warning_level_percent') }})
    limited_overflow_seating_enabled: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('limited_overflow_seating_enabled') }})
    low_seat_warning_level_pct: float = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('low_seat_warning_level_pct') }})
    owner_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('owner_id') }})
    seating_strategy_name: QueryProductsAll200ApplicationJSONSeatingConfigSeatingStrategyNameEnum = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seating_strategy_name') }})
    default_seat_expiry_in_days: Optional[float] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('default_seat_expiry_in_days') }})
    seat_reservation_expiry_in_days: Optional[float] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('seat_reservation_expiry_in_days') }})
    

@dataclass_json
@dataclasses.dataclass
class QueryProductsAll200ApplicationJSON:
    contact_page_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('contact_page_url') }})
    contact_sales_email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('contact_sales_email') }})
    contact_sales_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('contact_sales_url') }})
    contact_support_email: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('contact_support_email') }})
    contact_support_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('contact_support_url') }})
    home_page_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('home_page_url') }})
    id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('id') }})
    is_setup_complete: bool = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('is_setup_complete') }})
    on_access_denied_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_access_denied_url') }})
    on_access_granted_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_access_granted_url') }})
    on_no_seat_available_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_no_seat_available_url') }})
    on_no_subscriptions_found_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_no_subscriptions_found_url') }})
    on_subscription_canceled_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_subscription_canceled_url') }})
    on_subscription_not_found_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_subscription_not_found_url') }})
    on_subscription_not_ready_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_subscription_not_ready_url') }})
    on_subscription_suspended_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('on_subscription_suspended_url') }})
    owner_id: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('owner_id') }})
    privacy_notice_page_url: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('privacy_notice_page_url') }})
    product_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('product_name') }})
    publisher_name: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('publisher_name') }})
    seating_config: QueryProductsAll200ApplicationJSONSeatingConfig = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('seatingConfig') }})
    

@dataclasses.dataclass
class QueryProductsAllResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    query_products_all_200_application_json_objects: Optional[list[QueryProductsAll200ApplicationJSON]] = dataclasses.field(default=None)
    query_products_all_default_application_json_object: Optional[QueryProductsAllDefaultApplicationJSON] = dataclasses.field(default=None)
    