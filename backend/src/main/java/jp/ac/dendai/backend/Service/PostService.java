package jp.ac.dendai.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Dto.PostDto;
import jp.ac.dendai.backend.Dto.PostPointDto;
import jp.ac.dendai.backend.Entity.Post;
import jp.ac.dendai.backend.Repository.PostRepository;
import jp.ac.dendai.backend.util.AuthenticationFailedException;
import jp.ac.dendai.backend.util.NanoIdGenerator;

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
        // pointServiceのgetPointByAtPositionを呼び出す
        // それ以外は戻り値のPointをreturn
        PointDto pointData = pointService.getPointByAtPosition(latitude, longitude);
        return pointData;
    }

    public AuthDto checkUser(String userId) {
        // authServiceのgetAuthByUserIdを呼び出す
        // それ以外は戻り値のAuthDtoをreturn
        try {
            AuthDto authData = authService.getAuthByUserId(userId);
            if (!authData.getIsAuthed()) {
                throw new AuthenticationFailedException("ユーザー認証に失敗しました");
            }
            return authData;
        } catch (Exception e) {
            throw new AuthenticationFailedException("ユーザー認証に失敗しました");
        }
    }

    public PostDto getPostByPostId(String userId, String postId) {
        // postRepositoryのfindByPostIdを呼び出す
        // 戻り値のPostDtoをreturn
        PostDto postData = postRepository.findByPostId(userId, postId);
        return postData;
    }

    public List<PostDto> getPostByPointId(String userId, String pointId, boolean sortByTime) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // postRepositoryのfindByPointIdOrderByCreatedTimeかfindByPointIdOrderByGoodCountを呼び出す
        // 戻り値のList<PostDto>をreturn
        checkUser(userId);

        if (sortByTime) { // SortByTimeが何のbooleanかわからない
            List<PostDto> postCreatedTimeData = postRepository.findByPointIdOrderByCreatedTime(userId, pointId);
            return postCreatedTimeData;
        } else {
            List<PostDto> postGoodCountData = postRepository.findByPointIdOrderByGoodCount(userId, pointId);
            return postGoodCountData;
        }
    }

    public List<PostDto> getPostByUserId(String userId) {
        // postRepositoryのfindByUserIdを呼び出す
        // 戻り値のList<PostDto>をreturn
        List<PostDto> postData = postRepository.findByUserId(userId);
        return postData;
    }

    public PostPointDto countPostInSamePoint(String postId) {
        return postRepository.countPost(postId);
    }

    @Transactional
    public PostDto createPost(
        String userId, double latitude, double longitude, String content) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // ------------ここで例外が起きたらSQLをロールバックする--------------
        // | checkPointを呼び出し、Pointが存在しない場合にはPointServiceのsaveを呼び出す
        // | PostRepositoryのsaveを呼び出す
        // ----------------------------------------------------------------
        // それ以外は戻り値のPostを基にPostDtoを作り、return
        checkUser(userId);

        PointDto pointData = checkPoint(latitude, longitude);
        if (pointData == null) {
            pointData = pointService.createPoint(latitude, longitude);
        }
        String postId = NanoIdGenerator.generate();
        Post postData = new Post(postId, pointData.getPointId(), userId, content);
        postRepository.save(postData);
        return new PostDto(postData.getPostId(), postData.getPostedTime(),
                postData.getContent(), 0, false);
    }

    @Transactional
    public void deletePost(String postId, String userId) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // PostRepositoryのdeleteを呼び出す
        // それ以外はvoidをreturn
        checkUser(userId);
        PostPointDto postCountByPointId = countPostInSamePoint(postId);

        postRepository.delete(postId, userId);
        if (postCountByPointId.getPostCount() != 1) {
            return;
        }

        pointService.delete(postCountByPointId.getPointId());
    }
}
