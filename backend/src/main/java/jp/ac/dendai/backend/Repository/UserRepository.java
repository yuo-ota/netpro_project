package jp.ac.dendai.backend.Repository;

import org.springframework.stereotype.Repository;

import org.springframework.jdbc.core.JdbcTemplate;
import jp.ac.dendai.backend.Entity.User;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findByUserId(String userId) {
        // TODO
        // SELECT文でUserテーブルからタプルを取得する。
        // 取得した内容をUserクラスのインスタンスに入れてreturn
        return null;
    }

    public void save(User user) {
        // TODO
        // INSERT文でUserテーブルにuserインスタンスの情報を登録する。
        // 登録ができればそのままreturn
    }
}
