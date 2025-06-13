package jp.ac.dendai.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final PointService pointService;
    private final AuthService authService;

    public PostService(PostRepository postRepository, PointService pointService, AuthService authService) {
        this.postRepository = postRepository;
        this.pointService = pointService;
        this.authService = authService;
    }

    public PointDto checkPoint(Long latitude, Long longitude) {
        // TODO
        // pointServiceのgetPointByAtPositionを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のPointをreturn
        return null;
    }

    public AuthDto checkUser(String userId) {
        // TODO
        // authServiceのgetAuthByUserIdを呼び出し、例外がthrowされた場合は例外をthrowする
        // それ以外は戻り値のAuthDtoをreturn
        return null;
    }

    public PostDto getPostByPostId(String postId) {
        // TODO
        // postRepositoryのfindByPostIdを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のPostを基にPostDtoを作り、return
        return null;
    }

    public List<PostDto> getPostByPointId(String pointId) {
        // TODO
        // postRepositoryのfindByPointIdを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のList<Post>を基にList<PostDto>を作り、return
        return null;
    }

    public List<PostDto> getPostByUserId(String userId) {
        // TODO
        // postRepositoryのfindByUserIdを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のList<Post>を基にList<PostDto>を作り、return
        return null;
    }

    @Transactional
    public PostDto createPost(
            String userId, Long latitude, Long longitude, String content) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合は例外をthrow
        // ------------ここで例外が起きたらSQLをロールバックする--------------
        // | checkPointを呼び出し、Pointが存在しない場合にはPointServiceのsaveを呼び出す
        // | PostRepositoryのsaveを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // ----------------------------------------------------------------
        // それ以外は戻り値のPostを基にPostDtoを作り、return
        return null;
    }

    public void deletePost(String postId, String userId) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合は例外をthrow
        // PostRepositoryのdeleteを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外はvoidをreturn
        return;
    }
}
