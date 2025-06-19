package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.GoodDto;
import jp.ac.dendai.backend.Repository.GoodRepository;
import jp.ac.dendai.backend.Entity.Good;
import jp.ac.dendai.backend.util.AuthenticationFailedException;

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
        try {
            // authServiceのgetAuthByUserIdを呼び出す
            AuthDto authDto = authService.getAuthByUserId(userId);
            return authDto;
        } catch (Exception e) {
            // エラーが発生したらAuthenticationFailedException例外をthrow
            throw new AuthenticationFailedException("認証に失敗しました");
        }
    }

    public GoodDto createGood(String postId, String userId) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        AuthDto authDto = checkUser(userId);
        if (!authDto.getIsAuthed()) {
            throw new AuthenticationFailedException("認証に失敗しました");
        }
        // GoodRepositoryのsaveを呼び出す
        Good good = new Good(postId, userId);
        goodRepository.save(good);
        // それ以外は渡したGood基にGoodDtoを作りreturn
        return new GoodDto(postId, true);
    }

    public void deleteGood(String postId, String userId) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        AuthDto authDto = checkUser(userId);
        if (!authDto.getIsAuthed()) {
            throw new AuthenticationFailedException("認証に失敗しました");
        }
        // GoodRepositoryのdeleteを呼び出す
        goodRepository.delete(postId, userId);
    }

    public int getGoodCountByPostId(String postId) {
        return goodRepository.countByPostId(postId);
    }
}
