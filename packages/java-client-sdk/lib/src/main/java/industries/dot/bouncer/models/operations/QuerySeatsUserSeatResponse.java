package industries.dot.bouncer.models.operations;



public class QuerySeatsUserSeatResponse {
    public String contentType;
    public QuerySeatsUserSeatResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QuerySeatsUserSeatResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QuerySeatsUserSeat200ApplicationJSON querySeatsUserSeat200ApplicationJSONObject;
    public QuerySeatsUserSeatResponse withQuerySeatsUserSeat200ApplicationJSONObject(QuerySeatsUserSeat200ApplicationJSON querySeatsUserSeat200ApplicationJSONObject) {
        this.querySeatsUserSeat200ApplicationJSONObject = querySeatsUserSeat200ApplicationJSONObject;
        return this;
    }
    public QuerySeatsUserSeatDefaultApplicationJSON querySeatsUserSeatDefaultApplicationJSONObject;
    public QuerySeatsUserSeatResponse withQuerySeatsUserSeatDefaultApplicationJSONObject(QuerySeatsUserSeatDefaultApplicationJSON querySeatsUserSeatDefaultApplicationJSONObject) {
        this.querySeatsUserSeatDefaultApplicationJSONObject = querySeatsUserSeatDefaultApplicationJSONObject;
        return this;
    }
}
