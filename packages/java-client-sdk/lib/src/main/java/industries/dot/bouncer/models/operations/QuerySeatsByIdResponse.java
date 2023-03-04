package industries.dot.bouncer.models.operations;



public class QuerySeatsByIdResponse {
    public String contentType;
    public QuerySeatsByIdResponse withContentType(String contentType) {
        this.contentType = contentType;
        return this;
    }
    public Long statusCode;
    public QuerySeatsByIdResponse withStatusCode(Long statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    public QuerySeatsById200ApplicationJSON querySeatsById200ApplicationJSONObject;
    public QuerySeatsByIdResponse withQuerySeatsById200ApplicationJSONObject(QuerySeatsById200ApplicationJSON querySeatsById200ApplicationJSONObject) {
        this.querySeatsById200ApplicationJSONObject = querySeatsById200ApplicationJSONObject;
        return this;
    }
    public QuerySeatsByIdDefaultApplicationJSON querySeatsByIdDefaultApplicationJSONObject;
    public QuerySeatsByIdResponse withQuerySeatsByIdDefaultApplicationJSONObject(QuerySeatsByIdDefaultApplicationJSON querySeatsByIdDefaultApplicationJSONObject) {
        this.querySeatsByIdDefaultApplicationJSONObject = querySeatsByIdDefaultApplicationJSONObject;
        return this;
    }
}
