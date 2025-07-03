package jp.ac.dendai.backend.Dto;

public class DeleteGoodRequestDto {
    private String userId;
    private String postId;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
}