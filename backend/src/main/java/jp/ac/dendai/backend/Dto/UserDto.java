package jp.ac.dendai.backend.Dto;

public class UserDto {
    private String userId;

    public UserDto(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}
