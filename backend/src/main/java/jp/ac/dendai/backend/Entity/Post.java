package jp.ac.dendai.backend.Entity;

import java.time.LocalDateTime;

import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan
public class Post {
    private String postId;
    private String pointId;
    private String userId;
    private LocalDateTime postedTime;
    private String content;

    public Post(){

    }

    public Post(String postId, String pointId, String userId, String content){
        this.postId = postId;
        this.pointId = pointId;
        this.userId = userId;
        this.content = content;
    }

    public String getPostId(){
        return postId;
    }

    public void setPostId(String postId){

    }

    public String getPointId(){
        return pointId;
    }

    public void setPointId(String pointId){

    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){

    }

    public LocalDateTime getPostedTime(){
        return postedTime;
    }

    public String getContent(){
        return content;
    }

    public void setContent(String content){

    }
}
