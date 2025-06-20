package jp.ac.dendai.backend.Dto;

public class PointDto {
    private String pointId;
    private double latitude;
    private double longitude;
    private int goodCount;
    private boolean isUserInThisArea;

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

    public int getGoodCount() {
        return goodCount;
    }

    public void setGoodCount(int goodCount) {
        this.goodCount = goodCount;
    }

    public boolean getIsUserInThisArea() {
        return isUserInThisArea;
    }

    public void setIsUserInThisArea(boolean isUserInThisArea) {
        this.isUserInThisArea = isUserInThisArea;
    }
}
