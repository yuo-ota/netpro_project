package jp.ac.dendai.backend.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.GoodRequestDto;
import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Dto.PostRequestDto;
import jp.ac.dendai.backend.Service.PostService;
import jp.ac.dendai.backend.util.AuthenticationFailedException;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{userId}/{pointId}")
    public ResponseEntity<List<PostDto>> getPosts(
            @PathVariable String userId, @PathVariable String pointId, @RequestParam boolean sortByTime) {
        // postServiceのgetPostsByPointIdを呼び出し、200番で戻り値のList<PostDto>をreturn
        // それ以外(不正な値や例外)には500番でreturn
        try {
            List<PostDto> postData = postService.getPostByPointId(userId, pointId, sortByTime);

            if (postData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(postData);
        } catch (AuthenticationFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<PostDto> createPoint(@RequestBody PostRequestDto request) {
        String userId = request.getUserId();
        double latitude = request.getLatitude();
        double longitude = request.getLongitude();
        String content = request.getContent();
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
    public ResponseEntity<Void> deletePost(@RequestBody GoodRequestDto request) {
        String postId = request.getPostId();
        String userId = request.getUserId();
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
