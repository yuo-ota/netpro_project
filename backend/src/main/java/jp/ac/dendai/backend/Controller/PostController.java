package jp.ac.dendai.backend.Controller;

import java.util.List;

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
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{pointId}")
    public ResponseEntity<List<PostDto>> getPosts(String pointId) {
        // TODO
        // postServiceのgetPostsByPointIdを呼び出し、200番で戻り値のList<PostDto>をreturn
        // それ以外(不正な値や例外)には500番でreturn
        return null;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPoint(
            String userId, double latitude, double longitude, String content) {
        // TODO
        // postServiceのcreatePostを呼び出し、201番で戻り値のPostDtoをreturn
        // AuthenticationFailedExceptionの例外の場合は、401番でreturn
        // それ以外(不正な値や例外)には500番でreturn
        return null;
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePost(String postId, String userId) {
        // TODO
        // postServiceのdeletePostを呼び出し、204番でreturn
        // それ以外(不正な値や例外)には500番でreturn
        return null;
    }
}
