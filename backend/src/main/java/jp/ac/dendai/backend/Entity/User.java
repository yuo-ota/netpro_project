package jp.ac.dendai.backend.Entity;

public class User {
    private String userId;

    public User() {

    }

    public User(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
