package jp.ac.dendai.backend.Dto;

import java.time.LocalDateTime;

public class PostDto {
    private String postId;
    private LocalDateTime postedTime;
    private String content;
    private int goodCount;

    public PostDto(String postId, String content, int goodCount){
        this.postId = postId;
        this.content = content;
        this.goodCount = goodCount;
    }

    public String getPostId(){
        return postId;
    }

    public LocalDateTime getPostedTime(){
        return postedTime;
    }

    public String getContent(){
        return content;
    }
}
