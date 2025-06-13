package jp.ac.dendai.backend.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;

@Repository
public class PointRepository {
    private final JdbcTemplate jdbcTemplate;

    public PointRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Point findByPointId(String PointId) {
        // TODO
        // そのpointIDに対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        // エラーが発生したらその旨を例外としてthrow
        return null;
    }

    public Point findByAtPosition(Long latitude, Long longitude) {
        // TODO
        // その座標に対応したデータを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        // エラーが発生したらその旨を例外としてthrow
        return null;
    }

    public List<Point> findByNearPosition(Long latitude, Long longitude) {
        // TODO
        // その座標に近いポイントデータリストを取得するのが目的
        // SELECT文でPointテーブルからタプルを取得する。
        // 取得した内容をPointクラスのインスタンスに入れてreturn
        // エラーが発生したらその旨を例外としてthrow
        return null;
    }

    public void save(Point point) {
        // TODO
        // INSERT文でPointテーブルにpointインスタンスの情報を登録する。
        // 登録ができればそのままreturn
        // エラーが発生したらその旨を例外としてthrow
        return;
    }
}
