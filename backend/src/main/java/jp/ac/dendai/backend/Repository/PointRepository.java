package jp.ac.dendai.backend.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;

@Repository
public class PointRepository {
    private JdbcTemplate jdbcTemplate;

    public PointRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public Point findByPointId(String PointId){
        return null;
    }

    public Point findByAtPosition(Long latitude, Long longitude){
        return null;
    }

    public List<Point> findByNearPosition(Long latitude, Long longitude){
        return null;
    }

    public void save(Point point){

    }
}
