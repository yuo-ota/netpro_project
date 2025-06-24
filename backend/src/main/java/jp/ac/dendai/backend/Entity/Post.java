package jp.ac.dendai.backend.Entity;

import java.time.LocalDateTime;

public class Post {
    private String postId;
    private String pointId;
    private String userId;
    private LocalDateTime postedTime;
    private String content;

    public Post() {

    }

    public Post(String postId, String pointId, String userId, String content, LocalDateTime postedTime) {
        this.postId = postId;
        this.pointId = pointId;
        this.userId = userId;
        this.content = content;
        this.postedTime = postedTime;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getPointId() {
        return pointId;
    }

    public void setPointId(String pointId) {
        this.pointId = pointId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getPostedTime() {
        return postedTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
