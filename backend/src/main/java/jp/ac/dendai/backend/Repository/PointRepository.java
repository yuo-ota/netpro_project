package jp.ac.dendai.backend.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.util.CalcGeo;
import jp.ac.dendai.backend.util.CalcGeo.LatLngRange;

@Repository
public class PointRepository {
    private final JdbcTemplate jdbcTemplate;

    public PointRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Point findByPointId(String pointId) {
        //TODO
        // そのpointIDに対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        String sqlLatitude = "SELECT latitude FROM Point WHERE point_id = ?";
        Long latitude = jdbcTemplate.queryForObject(sqlLatitude, Long.class, pointId);
        String sqlLongitude = "SELECT longitude FROM Point WHERE point_id = ?";
        Long longitude = jdbcTemplate.queryForObject(sqlLongitude, Long.class, pointId);
        return new Point(pointId, latitude, longitude);
    }

    public Point findByAtPosition(Long latitude, Long longitude) {
        //TODO
        // その座標に対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        String sql = "SELECT * FROM Point WHERE latitude = ? AND longitude = ?";
        return jdbcTemplate.queryForObject(sql, Point.class, latitude, longitude);
    }

    public List<Point> findByNearPosition(double latitude, double longitude) {
        // TODO
        // その座標に近いポイントデータリストを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        String sql = "SELECT * FROM points WHERE ? < latitude AND latitude < ? AND ? < longitude AND longitude < ? ";

        LatLngRange b = CalcGeo.getBoundingBox(latitude, longitude, 100);

        List<Map<String, Object>> sqlList = jdbcTemplate.queryForList(sql,
                b.minLat, b.maxLat, b.minLng, b.maxLng);
        List<Point> result = new ArrayList<>();

        for (Map<String, Object> row : sqlList) {
            Object pointIdObj = row.get("point_id");
            Object latObj = row.get("latitude");
            Object lonObj = row.get("longitude");

            if (pointIdObj == null || latObj == null || lonObj == null) {
                continue;
            }

            try {
                Point p = new Point();
                p.setPointId(pointIdObj.toString());

                if (latObj instanceof Number latNum && lonObj instanceof Number lonNum) {
                    p.setLatitude(latNum.doubleValue());
                    p.setLongitude(lonNum.doubleValue());
                } else {
                    // 型が不正な場合はスキップ
                    continue;
                }

                result.add(p);
            } catch (Exception e) {
                // ログ出力
                System.err.println("データ変換エラー: " + e.getMessage());
            }
        }
        return result;
    }

    public void save(Point point) {
        // TODO
        // INSERT文でPointテーブルにpointインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        return;
    }
}
