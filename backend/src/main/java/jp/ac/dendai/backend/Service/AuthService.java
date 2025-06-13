package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public AuthDto getAuthByUserId(String userId) {
        // TODO
        // userServiceのgetUserByUserIdを呼び出し、戻り値のUserDtoを基にAuthDtoを作りreturn
        // もし、例外がthrowされたら例外をthrowをServiceに送る
        return null;
    }
}
