package jp.ac.dendai.backend.Repository;

import org.springframework.stereotype.Repository;

import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;
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
        // // ここのif(isEmpty())をPostRepositoryと同じようにtry-catchの使用に変えています
        try {
            String sql = "SELECT * FROM users WHERE user_id = ?";

            Map<String, Object> sqlMap = jdbcTemplate.queryForMap(sql, userId);

            Object userIdObj = sqlMap.get("user_id");
            if (userIdObj == null) {
                return null;
            }

            return new User(userIdObj.toString());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void save(User user) {
        // INSERT文でUserテーブルにuserインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = "INSERT INTO users (user_id) VALUES (?)";

        jdbcTemplate.update(sql, user.getUserId());
    }
}
