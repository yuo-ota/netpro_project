package jp.ac.dendai.backend.Repository;

import org.springframework.stereotype.Repository;

import org.springframework.jdbc.core.JdbcTemplate;
import jp.ac.dendai.backend.Entity.User;

@Repository
public class UserRepository {
    private JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findByUserId(String userId) {
        return null;
    }

    public void save(User user) {

    }
}
