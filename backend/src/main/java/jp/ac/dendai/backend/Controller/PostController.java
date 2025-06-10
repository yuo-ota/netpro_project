package jp.ac.dendai.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {
    private PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/{pointId}")
    public ResponseEntity<PostDto> getPosts(String pointId){
        return null;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPoint(String userId, Long latitude, Long longitude, String content){
        return null;
    }

    @DeleteMapping
    public void deletePost(String postId, String userId){

    }
}
