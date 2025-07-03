package jp.ac.dendai.backend.Entity;

public class Point {
    private String pointId;
    private double latitude;
    private double longitude;
    private int postCount;

    public Point() {

    }

    public Point(String pointId, double latitude, double longitude) {
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

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    public int getPostCount() {
        return postCount;
    }
    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }
}
