package jp.ac.dendai.backend.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        String sql = "SELECT * FROM posts WHERE post_id = ?";
        Map<String,Object> sqlMap = jdbcTemplate.queryForMap(sql, postId);
        if (sqlMap.isEmpty()){
            return null;
        }

        Object userIdObj = sqlMap.get("user_id");
        Object pointIdObj = sqlMap.get("point_id");
        Object contentObj = sqlMap.get("content");
        if (userIdObj == null || pointIdObj == null || contentObj == null) {
            return null;
        }

        return new Post(postId, pointIdObj.toString(), userIdObj.toString(), contentObj.toString());
    }

    public List<Post> findByPointId(String pointId) {
        // TODO
        // そのpointIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostクラスのインスタンスに入れてreturn
        String sql = "SELECT * FROM posts WHERE point_id = ?";
        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql, pointId);
        List<Post> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList){
            Object postIdObj = row.get("point_id");
            Object userIdObj = row.get("user_id");
            Object contentObj = row.get("content");

            if (postIdObj == null || userIdObj == null || contentObj == null) {
                continue;
            }

            result.add(new Post(postIdObj.toString(), pointId, userIdObj.toString(), contentObj.toString()));
        }
        return result;
    }

    public List<Post> findByUserId(String userId) {
        // TODO
        // そのuserIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostクラスのインスタンスに入れてreturn
        String sql = "SELECT * FROM posts WHERE user_id = ?";
        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql, userId);
        List<Post> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList){
            Object postIdObj = row.get("post_id");
            Object pointIdObj = row.get("point_id");
            Object contentObj = row.get("content");

            if (postIdObj == null || pointIdObj == null || contentObj == null) {
                continue;
            }

            result.add(new Post(postIdObj.toString(), pointIdObj.toString(), userId, contentObj.toString()));
        }
        return result;
    }

    public void save(Post post) {
        // TODO
        // INSERT文でPostテーブルにpostインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = """
                    INSERT INTO posts(post_id, user_id, point_id, content)
                    VALUES(?, ?, ?, ?)
                """;
                jdbcTemplate.update(sql, post.getPostId(), post.getUserId(), post.getPointId(), post.getContent());
    }

    public void delete(String postId) {
        // TODO
        // DELETE文でPostテーブルからpostインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
        String sql = "DELETE FROM posts WHERE post_id = ?";
        jdbcTemplate.update(sql, postId);
    }
}
