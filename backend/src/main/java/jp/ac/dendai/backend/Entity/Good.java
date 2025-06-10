package jp.ac.dendai.backend.Entity;

public class Good {
    private String postId;
    private String userId;

    public Good() {

    }

    public Good(String postId, String userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
