package jp.ac.dendai.backend.Dto;

public class AuthDto {
    private String userId;
    private boolean isAuthed;

    public AuthDto(String userId, boolean isAuthed) {
        this.userId = userId;
        this.isAuthed = isAuthed;
    }

    public String getUserId() {
        return userId;
    }

    public boolean getIsAuthed() {
        return isAuthed;
    }
}
