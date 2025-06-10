package jp.ac.dendai.backend.Repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.Entity.Post;

@Repository
public class PostRepository {
    private JdbcTemplate jdbcTemplate;

    public PostRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public Post findByPostId(String postId){
        return null;
    }

    public List<Post> findByPointId(String pointId){
        return null;
    }

    public List<Point> findByUserId(String userId){
        return null;
    }

    public void save(Post post){

    }

    public void delete(String postId){

    }
}
