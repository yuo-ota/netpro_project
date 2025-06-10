package jp.ac.dendai.backend.Repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Good;

@Repository
public class GoodRepository {
    private JdbcTemplate jdbcTemplate;

    public GoodRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Good good){

    }

    public void delete(String postId, String userId){

    }
}
