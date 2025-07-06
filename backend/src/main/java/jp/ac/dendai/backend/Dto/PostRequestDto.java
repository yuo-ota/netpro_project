package jp.ac.dendai.backend.Dto;

public class PostRequestDto {
    private String userId;
    private double latitude;
    private double longitude;
    private String content;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}