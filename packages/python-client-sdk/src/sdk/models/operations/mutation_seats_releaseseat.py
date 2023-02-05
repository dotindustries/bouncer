import dataclasses
from dataclasses_json import dataclass_json
from sdk import utils
from typing import Any, Optional


@dataclasses.dataclass
class MutationSeatsReleaseSeatPathParams:
    seat_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'seatId', 'style': 'simple', 'explode': False }})
    subscription_id: str = dataclasses.field(metadata={'path_param': { 'field_name': 'subscriptionId', 'style': 'simple', 'explode': False }})
    

@dataclasses.dataclass
class MutationSeatsReleaseSeatRequest:
    path_params: MutationSeatsReleaseSeatPathParams = dataclasses.field()
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsReleaseSeatDefaultApplicationJSONIssues:
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    

@dataclass_json
@dataclasses.dataclass
class MutationSeatsReleaseSeatDefaultApplicationJSON:
    code: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('code') }})
    message: str = dataclasses.field(metadata={'dataclasses_json': { 'letter_case': utils.field_name('message') }})
    issues: Optional[list[MutationSeatsReleaseSeatDefaultApplicationJSONIssues]] = dataclasses.field(default=None, metadata={'dataclasses_json': { 'letter_case': utils.field_name('issues') }})
    

@dataclasses.dataclass
class MutationSeatsReleaseSeatResponse:
    content_type: str = dataclasses.field()
    status_code: int = dataclasses.field()
    mutation_seats_release_seat_200_application_json_any: Optional[Any] = dataclasses.field(default=None)
    mutation_seats_release_seat_default_application_json_object: Optional[MutationSeatsReleaseSeatDefaultApplicationJSON] = dataclasses.field(default=None)
    