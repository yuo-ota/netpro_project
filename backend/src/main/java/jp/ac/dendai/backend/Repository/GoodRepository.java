package jp.ac.dendai.backend.Repository;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Good;

@Repository
public class GoodRepository {
    private final JdbcTemplate jdbcTemplate;

    public GoodRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Good good) {
        // INSERT文でGoodテーブルにgoodインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = "INSERT INTO goods (user_id, post_id) VALUES (?, ?)";

        jdbcTemplate.update(sql,
                good.getUserId(),
                good.getPostId());
    }

    public void delete(String postId, String userId) {
        // DELETE文でGoodテーブルからgoodインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
        String sql = "DELETE FROM goods WHERE post_id = ? AND user_id = ?";

        jdbcTemplate.update(sql,
                postId, userId);
    }
}
