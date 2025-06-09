package jp.ac.dendai.backend.Repository;

import org.springframework.stereotype.Repository;

@Repository
public class UserRepository{
    private JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findByUserId(String userId){

    }

    public void save(User user){

    }
}
