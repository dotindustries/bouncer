import { SpeakeasyBase, SpeakeasyMetadata } from "../../../internal/utils";


export class MutationSeatsReleaseSeatPathParams extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=seatId" })
  seatId: string;

  @SpeakeasyMetadata({ data: "pathParam, style=simple;explode=false;name=subscriptionId" })
  subscriptionId: string;
}

export class MutationSeatsReleaseSeatRequest extends SpeakeasyBase {
  @SpeakeasyMetadata()
  pathParams: MutationSeatsReleaseSeatPathParams;
}

export class MutationSeatsReleaseSeatDefaultApplicationJSONIssues extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsReleaseSeatDefaultApplicationJSON extends SpeakeasyBase {
  @SpeakeasyMetadata({ data: "json, name=code" })
  code: string;

  @SpeakeasyMetadata({ data: "json, name=issues", elemType: MutationSeatsReleaseSeatDefaultApplicationJSONIssues })
  issues?: MutationSeatsReleaseSeatDefaultApplicationJSONIssues[];

  @SpeakeasyMetadata({ data: "json, name=message" })
  message: string;
}

export class MutationSeatsReleaseSeatResponse extends SpeakeasyBase {
  @SpeakeasyMetadata()
  contentType: string;

  @SpeakeasyMetadata()
  statusCode: number;

  @SpeakeasyMetadata()
  mutationSeatsReleaseSeat200ApplicationJSONAny?: any;

  @SpeakeasyMetadata()
  mutationSeatsReleaseSeatDefaultApplicationJSONObject?: MutationSeatsReleaseSeatDefaultApplicationJSON;
}