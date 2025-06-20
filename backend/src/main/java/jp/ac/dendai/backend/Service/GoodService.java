package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.GoodDto;
import jp.ac.dendai.backend.Repository.GoodRepository;

@Service
public class GoodService {
    private final GoodRepository goodRepository;
    private final AuthService authService;
    private final PostService postService;

    public GoodService(GoodRepository goodRepository, AuthService authService, PostService postService) {
        this.goodRepository = goodRepository;
        this.authService = authService;
        this.postService = postService;
    }

    public AuthDto checkUser(String userId) {
        // TODO
        // authServiceのgetAuthByUserIdを呼び出し、例外がthrowされた場合は例外をthrowする
        // それ以外は戻り値のAuthDtoをreturn
        return null;
    }

    public GoodDto createGood(String postId, String userId) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // GoodRepositoryのsaveを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は渡したGood基にGoodDtoを作りreturn
        return null;
    }

    public void deleteGood(String postId, String userId) {
        // TODO
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // GoodRepositoryのdeleteを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外はvoidをreturn
        return;
    }
}
