package jp.ac.dendai.backend.Dto;

public class GoodDto {
    private String postId;
    private boolean isLinked;

    public GoodDto(String postId, boolean isLiked) {
        this.postId = postId;
        this.isLinked = isLiked;
    }

    public String getPostId() {
        return postId;
    }

    public boolean getIsLiked() {
        return isLinked;
    }
}
