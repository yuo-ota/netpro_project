package jp.ac.dendai.backend.Entity;

public class Point {
    private String pointId;
    private Long latitude;
    private Long longitude;

    public Point() {

    }

    public Point(String pointId, Long latitude, Long longitude) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getPointId() {
        return pointId;
    }

    public void setPointId(String pointId) {
        this.pointId = pointId;
    }

    public Long getLatitude() {
        return latitude;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Long getLongitude() {
        return longitude;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }
}
