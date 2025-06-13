package jp.ac.dendai.backend.Dto;

public class PointDto {
    private String pointId;
    private Long latitude;
    private Long longitude;

    public PointDto(String pointId, Long latitude, Long longitude) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getPointed() {
        return pointId;
    }

    public Long getLantitude() {
        return latitude;
    }

    public Long getLongitude() {
        return longitude;
    }
}
