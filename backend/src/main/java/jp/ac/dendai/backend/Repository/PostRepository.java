package jp.ac.dendai.backend.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.Entity.Post;

@Repository
public class PostRepository {
    private final JdbcTemplate jdbcTemplate;

    public PostRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Post findByPostId(String postId) {
        // TODO
        // そのpostIDに対応したデータを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostクラスのインスタンスに入れてreturn
        return null;
    }

    public List<Post> findByPointId(String pointId) {
        // TODO
        // そのpointIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostクラスのインスタンスに入れてreturn
        return null;
    }

    public List<Point> findByUserId(String userId) {
        // TODO
        // そのuserIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostクラスのインスタンスに入れてreturn
        return null;
    }

    public void save(Post post) {
        // TODO
        // INSERT文でPostテーブルにpostインスタンスの情報を登録する。
        // 登録ができればそのままreturn
    }

    public void delete(String postId) {
        // TODO
        // DELETE文でPostテーブルからpostインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
    }
}
