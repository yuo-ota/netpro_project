package jp.ac.dendai.backend.Entity;

import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan
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
    }
}
