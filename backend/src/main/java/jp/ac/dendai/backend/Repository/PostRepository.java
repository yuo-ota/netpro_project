package jp.ac.dendai.backend.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Dto.PostPointDto;
import jp.ac.dendai.backend.Entity.Post;

@Repository
public class PostRepository {
    private final JdbcTemplate jdbcTemplate;

    public PostRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public PostDto findByPostId(String userId, String postId) {
        // そのpostIDに対応したデータを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostDtoクラスのインスタンスに入れてreturn
        try {
            String sql = """
                        SELECT *
                        FROM (
                            SELECT
                                p.post_id, p.point_id, p.user_id, p.content, p.posted_time, COUNT(g.post_id) AS good_count,
                                CASE WHEN ug.post_id IS NULL THEN false ELSE true END AS is_good_by_user
                            FROM posts AS p
                            LEFT JOIN goods AS g
                            ON p.post_id = g.post_id
                            LEFT JOIN goods AS ug
                            ON p.post_id = ug.post_id
                            AND ug.user_id = ?
                            WHERE p.post_id = ?
                            GROUP BY p.post_id, p.point_id, p.user_id, p.content, p.posted_time, is_good_by_user
                        ) AS post_with_good
                    """;
            Map<String, Object> sqlMap = jdbcTemplate.queryForMap(sql, userId, postId);

            Object pointIdObj = sqlMap.get("point_id");
            Object userIdObj = sqlMap.get("user_id");
            Object contentObj = sqlMap.get("content");
            Object postedTimeObj = sqlMap.get("posted_time");
            Object goodCountObj = sqlMap.get("good_count");
            Object isGoodedObj = sqlMap.get("is_good_by_user");

            if (pointIdObj == null || userIdObj == null || contentObj == null
                    || postedTimeObj == null || goodCountObj == null) {
                return null;
            }
            if (goodCountObj instanceof Number goodCount
                    && postedTimeObj instanceof Timestamp ts
                    && isGoodedObj instanceof Boolean isGooded) {
                LocalDateTime postedTime = ts.toLocalDateTime();
                return new PostDto(postId, postedTime, contentObj.toString(),
                        goodCount.intValue(), isGooded);
            }
            return null;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<PostDto> findByPointIdOrderByCreatedTime(String userId, String pointId) {
        // そのpointIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostDtoクラスのインスタンスに入れてreturn
        String sql = """
                    SELECT *
                    FROM (
                        SELECT
                            p.post_id, p.point_id, p.user_id, p.content, p.posted_time, COUNT(g.post_id) AS good_count,
                            CASE WHEN ug.post_id IS NULL THEN false ELSE true END AS is_good_by_user
                        FROM posts AS p
                        LEFT JOIN goods AS g
                        ON p.post_id = g.post_id
                        LEFT JOIN goods AS ug
                        ON p.post_id = ug.post_id
                        AND ug.user_id = ?
                        WHERE p.point_id = ?
                        GROUP BY p.post_id, p.point_id, p.user_id, p.content, p.posted_time, is_good_by_user
                    ) AS post_with_good
                    ORDER BY posted_time DESC
                """;
        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql, userId, pointId);
        List<PostDto> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList) {
            Object postIdObj = row.get("post_id");
            Object userIdObj = row.get("user_id");
            Object contentObj = row.get("content");
            Object postedTimeObj = row.get("posted_time");
            Object goodCountObj = row.get("good_count");
            Object isGoodedObj = row.get("is_good_by_user");

            if (postIdObj == null || userIdObj == null || contentObj == null
                    || postedTimeObj == null || goodCountObj == null) {
                continue;
            }
            if (goodCountObj instanceof Number goodCount
                    && postedTimeObj instanceof Timestamp ts
                    && isGoodedObj instanceof Boolean isGooded) {
                LocalDateTime postedTime = ts.toLocalDateTime();
                result.add(new PostDto(postIdObj.toString(), postedTime, contentObj.toString(),
                        goodCount.intValue(), isGooded));
            }
        }
        return result;
    }

    public List<PostDto> findByPointIdOrderByGoodCount(String userId, String pointId) {
        // そのpointIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostDtoクラスのインスタンスに入れてreturn
        String sql = """
                    SELECT *
                    FROM (
                        SELECT
                            p.post_id, p.point_id, p.user_id, p.content, p.posted_time, COUNT(g.post_id) AS good_count,
                            CASE WHEN ug.post_id IS NULL THEN false ELSE true END AS is_good_by_user
                        FROM posts AS p
                        LEFT JOIN goods AS g
                        ON p.post_id = g.post_id
                        LEFT JOIN goods AS ug
                        ON p.post_id = ug.post_id
                        AND ug.user_id = ?
                        WHERE p.point_id = ?
                        GROUP BY p.post_id, p.point_id, p.user_id, p.content, p.posted_time, is_good_by_user
                    ) AS post_with_good
                    ORDER BY good_count DESC
                """;
        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql, userId, pointId);
        List<PostDto> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList) {
            Object postIdObj = row.get("post_id");
            Object userIdObj = row.get("user_id");
            Object contentObj = row.get("content");
            Object postedTimeObj = row.get("posted_time");
            Object goodCountObj = row.get("good_count");
            Object isGoodedObj = row.get("is_good_by_user");

            if (postIdObj == null || userIdObj == null || contentObj == null
                    || postedTimeObj == null || goodCountObj == null) {
                continue;
            }
            if (goodCountObj instanceof Number goodCount
                    && postedTimeObj instanceof Timestamp ts
                    && isGoodedObj instanceof Boolean isGooded) {
                LocalDateTime postedTime = ts.toLocalDateTime();
                result.add(new PostDto(postIdObj.toString(), postedTime, contentObj.toString(),
                        goodCount.intValue(), isGooded));
            }
        }
        return result;
    }

    public List<PostDto> findByUserId(String userId) {
        // そのuserIDに対応したデータリストを取得するのが目的
        // SELECT文でPostテーブルからタプルを取得する。
        // 取得した内容をPostDtoクラスのインスタンスに入れてreturn
        String sql = """
                    SELECT *
                    FROM (
                        SELECT
                            p.post_id, p.point_id, p.user_id, p.content, p.posted_time, COUNT(g.post_id) AS good_count,
                            CASE WHEN ug.post_id IS NULL THEN false ELSE true END AS is_good_by_user
                        FROM posts AS p
                        LEFT JOIN goods AS g
                        ON p.post_id = g.post_id
                        LEFT JOIN goods AS ug
                        ON p.post_id = ug.post_id
                        AND ug.user_id = ?
                        WHERE p.user_id = ?
                        GROUP BY p.post_id, p.point_id, p.user_id, p.content, p.posted_time, is_good_by_user
                    ) AS post_with_good
                """;
        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql, userId, userId);
        List<PostDto> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList) {
            Object postIdObj = row.get("post_id");
            Object pointIdObj = row.get("point_id");
            Object contentObj = row.get("content");
            Object postedTimeObj = row.get("posted_time");
            Object goodCountObj = row.get("good_count");
            Object isGoodedObj = row.get("is_good_by_user");

            if (postIdObj == null || pointIdObj == null || contentObj == null
                    || postedTimeObj == null || goodCountObj == null || isGoodedObj == null) {
                continue;
            }
            if (goodCountObj instanceof Number goodCount
                    && postedTimeObj instanceof Timestamp ts
                    && isGoodedObj instanceof Boolean isGooded) {
                LocalDateTime postedTime = ts.toLocalDateTime();
                result.add(new PostDto(postIdObj.toString(), postedTime, contentObj.toString(),
                        goodCount.intValue(), isGooded));
            }
        }
        return result;
    }

    public PostPointDto countPost(String postId) {
        String sql = """
            SELECT 
                p.point_id,
                COUNT(*) AS post_count
            FROM 
                posts p
            WHERE 
                p.point_id = (
                    SELECT point_id FROM posts WHERE post_id = ?
                )
            GROUP BY 
                p.point_id;
        """;

        jdbcTemplate.queryForMap(sql, postId);

        Map<String, Object> result = jdbcTemplate.queryForMap(sql, postId);

        String pointId = (String) result.get("point_id");
        int postCount = ((Number) result.get("post_count")).intValue();

        return new PostPointDto(pointId, postCount);
    }

    public void save(Post post) {
        // INSERT文でPostテーブルにpostインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = """
                    INSERT INTO posts(post_id, user_id, point_id, content)
                    VALUES(?, ?, ?, ?)
                """;
        jdbcTemplate.update(sql, post.getPostId(), post.getUserId(), post.getPointId(), post.getContent());
    }

    public void delete(String postId) {
        // DELETE文でPostテーブルからpostインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
        String sql = "DELETE FROM posts WHERE post_id = ?";
        jdbcTemplate.update(sql, postId);
    }
}
