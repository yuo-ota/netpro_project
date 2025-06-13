package jp.ac.dendai.backend.Repository;

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
        // TODO
        // INSERT文でGoodテーブルにgoodインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        // エラーが発生したらその旨を例外としてthrow
    }

    public void delete(String postId, String userId) {
        // TODO
        // DELETE文でGoodテーブルからgoodインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
        // エラーが発生したらその旨を例外としてthrow
    }
}
