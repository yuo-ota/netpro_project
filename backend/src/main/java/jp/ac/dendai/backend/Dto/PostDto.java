package jp.ac.dendai.backend.Dto;

import java.time.LocalDateTime;

public class PostDto {
    private String postId;
    private LocalDateTime postedTime;
    private String content;
    private int goodCount;
    private boolean isGooded;

    public PostDto(String postId, LocalDateTime postedTime, String content, int goodCount, boolean isGooded) {
        this.postId = postId;
        this.postedTime = postedTime;
        this.content = content;
        this.goodCount = goodCount;
        this.isGooded = isGooded;
    }

    public String getPostId() {
        return postId;
    }

    public LocalDateTime getPostedTime() {
        return postedTime;
    }

    public String getContent() {
        return content;
    }

    public int getGoodCount() {
        return goodCount;
    }

    public void setIsGooded(boolean isGooded) {
        this.isGooded = isGooded;
    }

    public boolean getIsGooded() {
        return isGooded;
    }
}
