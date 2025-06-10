package jp.ac.dendai.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Dto.UserDto;
import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.Entity.Post;
import jp.ac.dendai.backend.Repository.PostRepository;

@Service
public class PostService {
    private PostRepository postRepository;
    private PointService pointService;
    public AuthService authService;

    public PostService(PostRepository postRepository, PointService pointService, AuthService authService){
        this.postRepository = postRepository;
        this.pointService = pointService;
        this.authService = authService;
    }

    public Point checkPoint(Long latitude, Long longitude){
        return null;
    }

    public UserDto checkUser(String userId){
        return null;
    }

    public PostDto getPostByPostId(String postId){
        return null;
    }

    public List<PostDto> getPostByPointId(String pointId){
        return null;
    }

    public List<Post> getPostByUserId(String userId){
        return null;
    }

    @Transactional
    public PostDto createPost(String userId, Long latitude, Long longitude, String content){
        return null;
    }

    public PostDto deletePost(String postId, String userId){
        return null;
    }
}
