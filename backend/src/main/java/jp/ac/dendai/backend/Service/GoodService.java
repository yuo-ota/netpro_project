package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.GoodDto;
import jp.ac.dendai.backend.Entity.Good;
import jp.ac.dendai.backend.Repository.GoodRepository;
import jp.ac.dendai.backend.util.AuthenticationFailedException;

@Service
public class GoodService {
    private final GoodRepository goodRepository;
    private final AuthService authService;

    public GoodService(GoodRepository goodRepository, AuthService authService) {
        this.goodRepository = goodRepository;
        this.authService = authService;
    }

    public AuthDto checkUser(String userId) {
        // authServiceのgetAuthByUserIdを呼び出し、
        // 例外がthrowされた場合はAuthenticationFailedException例外をthrowする
        // それ以外は戻り値のAuthDtoをreturn
        try {
            AuthDto authData = authService.getAuthByUserId(userId);
            return authData;
        } catch (Exception e){
            throw new AuthenticationFailedException("ユーザー認証に失敗しました");
        }
    }

    public GoodDto createGood(String postId, String userId) {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // GoodRepositoryのsaveを呼び出す
        // それ以外は渡したGood基にGoodDtoを作りreturn
        AuthDto authData = checkUser(userId);
        if (!authData.getIsAuthed()){
            throw new AuthenticationFailedException("ユーザー認証に失敗しました");
        }
        goodRepository.save(new Good(postId, userId));
        return new GoodDto(postId, true);
    }

    public void deleteGood(String postId, String userId) throws Exception {
        // checkUserを呼び出し、認証できなかった場合はAuthenticationFailedException例外をthrow
        // GoodRepositoryのdeleteを呼び出す
        AuthDto authData = checkUser(userId);
        if (!authData.getIsAuthed()){
            throw new AuthenticationFailedException("ユーザー認証に失敗しました");
        }
        goodRepository.delete(postId, userId);
    }

    public int getGoodCountByPostId(String postId) {
        // GoodRepositoryのgetGoodCountByPostIdを呼び出し、戻り値をreturn
        return goodRepository.countByPostId(postId);
    }
}
