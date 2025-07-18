package jp.ac.dendai.backend.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.util.CalcGeo.LatLngRange;

@Repository
public class PointRepository {
    private final JdbcTemplate jdbcTemplate;

    public PointRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Point findByPointId(String pointId) {
        // そのpointIDに対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        try {
            String sql = """
                SELECT 
                    p.point_id,
                    p.latitude,
                    p.longitude,
                    COUNT(posts.point_id) AS post_count
                FROM 
                    points p
                LEFT JOIN 
                    posts ON p.point_id = posts.point_id
                WHERE p.point_id = ?
                GROUP BY 
                    p.point_id, p.latitude, p.longitude
            """;
            Map<String, Object> sqlMap = jdbcTemplate.queryForMap(sql, pointId);

            Object latObj = sqlMap.get("latitude");
            Object lonObj = sqlMap.get("longitude");
            Object postCountObj = sqlMap.get("post_count");

            if (latObj == null || lonObj == null || postCountObj == null) {
                return null;
            }

            Point p = new Point();
            p.setPointId(pointId.toString());

            if (latObj instanceof Number latNum && lonObj instanceof Number lonNum && postCountObj instanceof Number postCountNum) {
                p.setLatitude(latNum.doubleValue());
                p.setLongitude(lonNum.doubleValue());
                p.setPostCount(postCountNum.intValue());
                return p;
            }
            return null;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Point findByAtPosition(double latitude, double longitude) {
        // その座標に対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        try {
            String sql = "SELECT * FROM points WHERE latitude = ? AND longitude = ?";
            Map<String, Object> sqlMap = jdbcTemplate.queryForMap(sql, latitude, longitude);

            Object pointIdObj = sqlMap.get("point_id");
            if (pointIdObj == null) {
                return null;
            }
            return new Point(pointIdObj.toString(), latitude, longitude);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Point> findByNearPosition(LatLngRange b) {
        // その座標に近いポイントデータリストを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        String sql = """
            SELECT 
                p.point_id,
                p.latitude,
                p.longitude,
                COUNT(posts.point_id) AS post_count
            FROM 
                points p
            LEFT JOIN 
                posts ON p.point_id = posts.point_id
            WHERE 
                ? < p.latitude AND p.latitude < ?
                AND ? < p.longitude AND p.longitude < ?
            GROUP BY 
                p.point_id, p.latitude, p.longitude
        """;

        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql,
                b.minLat, b.maxLat, b.minLng, b.maxLng);
        List<Point> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList) {
            Object pointIdObj = row.get("point_id");
            Object latObj = row.get("latitude");
            Object lonObj = row.get("longitude");
            Object postCountObj = row.get("post_count");

            if (pointIdObj == null || latObj == null || lonObj == null || postCountObj == null) {
                continue;
            }

            try {
                Point p = new Point();
                p.setPointId(pointIdObj.toString());

                if (latObj instanceof Number latNum && lonObj instanceof Number lonNum && postCountObj instanceof Number postCountNum) {
                    p.setLatitude(latNum.doubleValue());
                    p.setLongitude(lonNum.doubleValue());
                    p.setPostCount(postCountNum.intValue());
                } else {
                    // 型が不正な場合はスキップ
                    continue;
                }
                result.add(p);
            } catch (Exception e) {
                e.printStackTrace();
                continue;
            }
        }
        return result;
    }

    public void save(Point point) {
        // INSERT文でPointテーブルにpointインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        String sql = "INSERT INTO points (point_id, latitude, longitude) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, point.getPointId(), point.getLatitude(), point.getLongitude());
    }
    
    public void delete(String pointId) {
        // DELETE文でPostテーブルからpostインスタンスにあるIDの情報を削除する。
        // 削除ができればそのままreturn
        String sql = "DELETE FROM points WHERE point_id = ?";
        jdbcTemplate.update(sql, pointId);
    }
}
