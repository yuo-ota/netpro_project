package jp.ac.dendai.backend.Repository;

import org.springframework.stereotype.Repository;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import jp.ac.dendai.backend.Entity.User;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findByUserId(String userId) {
        // SELECT文でUserテーブルからタプルを取得する。
        // 取得した内容をUserクラスのインスタンスに入れてreturn
        String sql ="SELECT * FROM users WHERE user_id = ?";

        Map<String, Object> sqlMap = jdbcTemplate.queryForMap(sql, userId);
        if (sqlMap.isEmpty()) {
            return null;
        }

        Object userIdObj = sqlMap.get("user_id");
        if (userIdObj == null) {
            return null;
        }

        return new User(userIdObj.toString());
    }

    public void save(User user) {
        // INSERT文でUserテーブルにuserインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = "INSERT INTO users (user_id) VALUES (?)";

        jdbcTemplate.update(sql, user.getUserId());
    }
}
