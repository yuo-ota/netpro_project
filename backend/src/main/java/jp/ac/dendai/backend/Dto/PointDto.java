package jp.ac.dendai.backend.Dto;

public class PointDto {
    private String pointId;
    private double latitude;
    private double longitude;
    private boolean isUserInThisArea;

    public PointDto(String pointId, double latitude, double longitude) {
        this.pointId = pointId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getPointed() {
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
}
