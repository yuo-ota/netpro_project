package jp.ac.dendai.backend.Dto;

public class PointDto {
    private String pointId;
    private double latitude;
    private double longitude;

    public PointDto(String pointId, double latitude, double longitude) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getPointed() {
        return pointId;
    }

    public double getLantitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
}
