package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Dto.UserDto;
import jp.ac.dendai.backend.Repository.GoodRepository;

@Service
public class GoodService {
    private GoodRepository goodRepository;
    private AuthService authService;
    private PostService postService;

    public GoodService(GoodRepository goodRepository, AuthService authService, PostService postService){
        this.goodRepository = goodRepository;
        this.authService = authService;
        this.postService = postService;
    }

    public UserDto checkUser(String userId){
        return null;
    }

    public PostDto updateLikeStatus(String userId, String postId, boolean isLiked){
        return null;
    }

    public PostDto createGood(String postId,String userId){
        return null;
    }

    public PostDto deleteGood(String postId, String userId){
        return null;
    }
}
