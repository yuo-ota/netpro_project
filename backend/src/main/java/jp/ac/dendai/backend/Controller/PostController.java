package jp.ac.dendai.backend.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Service.PostService;
import jp.ac.dendai.backend.util.AuthenticationFailedException;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{pointId}")
    public ResponseEntity<List<PostDto>> getPosts(String pointId) {
        // postServiceのgetPostsByPointIdを呼び出し、200番で戻り値のList<PostDto>をreturn
        // それ以外(不正な値や例外)には500番でreturn
        try {
            List<PostDto> postData = postService.getPostByPointId(pointId);

            if (postData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(postData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<PostDto> createPoint(
            String userId, double latitude, double longitude, String content) {
        // postServiceのcreatePostを呼び出し、201番で戻り値のPostDtoをreturn
        // AuthenticationFailedExceptionの例外の場合は、401番でreturn
        // それ以外(不正な値や例外)には500番でreturn
        try {
            PostDto postData = postService.createPost(userId, latitude, longitude, content);
            return ResponseEntity.status(HttpStatus.CREATED).body(postData);
        } catch (AuthenticationFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePost(String postId, String userId) {
        // postServiceのdeletePostを呼び出し、204番でreturn
        // それ以外(不正な値や例外)には500番でreturn
        try {
            postService.deletePost(postId, userId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (AuthenticationFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
