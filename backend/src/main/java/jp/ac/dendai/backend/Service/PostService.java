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

    public PointDto checkPoint(double latitude, double longitude) {
        // TODO
        // pointServiceのgetPointByAtPositionを呼び出す
        // それ以外は戻り値のPointをreturn
        return null;
    }

    public AuthDto checkUser(String userId) {
        // TODO
        // authServiceのgetAuthByUserIdを呼び出す
        // それ以外は戻り値のAuthDtoをreturn
        return null;
    }

    public PostDto getPostByPostId(String userId, String postId) {
        // TODO
        // postRepositoryのfindByPostIdを呼び出す
        // 戻り値のPostDtoをreturn
        return null;
    }

    public List<PostDto> getPostByPointId(String userId, String pointId, boolean sortByTime) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // postRepositoryのfindByPointIdOrderByCreatedTimeかfindByPointIdOrderByGoodCountを呼び出す
        // 戻り値のList<PostDto>をreturn
        return null;
    }

    public List<PostDto> getPostByUserId(String userId) {
        // TODO
        // postRepositoryのfindByUserIdを呼び出す
        // 戻り値のList<PostDto>をreturn
        return null;
    }

    @Transactional
    public PostDto createPost(
            String userId, double latitude, double longitude, String content) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // ------------ここで例外が起きたらSQLをロールバックする--------------
        // | checkPointを呼び出し、Pointが存在しない場合にはPointServiceのsaveを呼び出す
        // | PostRepositoryのsaveを呼び出す
        // ----------------------------------------------------------------
        // それ以外は戻り値のPostを基にPostDtoを作り、return
        return null;
    }

    public void deletePost(String postId, String userId) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // PostRepositoryのdeleteを呼び出す
        // それ以外はvoidをreturn
        return;
    }
}
