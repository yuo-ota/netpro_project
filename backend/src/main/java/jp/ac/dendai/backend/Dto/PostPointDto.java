package jp.ac.dendai.backend.Dto;

public class PostPointDto {
    private String pointId;
    private int postCount;

    public PostPointDto(String pointId, int postCount) {
        this.pointId = pointId;
        this.postCount = postCount;
    }

    public String getPointId() {
        return pointId;
    }

    public int getPostCount() {
        return postCount;
    }

    public void setPointId(String pointId) {
        this.pointId = pointId;
    }

    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }
}
