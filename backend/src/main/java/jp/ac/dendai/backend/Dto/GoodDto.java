package jp.ac.dendai.backend.Dto;

public class GoodDto {
    private String postId;
    private boolean isGooded;

    public GoodDto(String postId, boolean isGooded) {
        this.postId = postId;
        this.isGooded = isGooded;
    }

    public String getPostId() {
        return postId;
    }

    public boolean getIsGooded() {
        return isGooded;
    }
}
