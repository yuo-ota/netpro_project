package jp.ac.dendai.backend.Dto;

public class PointDto {
    private String pointId;
    private double latitude;
    private double longitude;
    private boolean isUserInThisArea;
    private int postCount;

    public PointDto(String pointId, double latitude, double longitude) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postCount = -1;
    }

    public PointDto(String pointId, double latitude, double longitude, int postCount) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postCount = postCount;
    }

    public String getPointId() {
        return pointId;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public boolean getIsUserInThisArea() {
        return isUserInThisArea;
    }

    public void setIsUserInThisArea(boolean isUserInThisArea) {
        this.isUserInThisArea = isUserInThisArea;
    }
    public int getPostCount() {
        return postCount;
    }
    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }
}
