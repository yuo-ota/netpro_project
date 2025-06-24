package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Dto.UserDto;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public AuthDto getAuthByUserId(String userId) throws Exception {
        // userServiceのgetUserByUserIdを呼び出し、戻り値のUserDtoを基にisAuthedがtrueのAuthDtoを作りreturn
        // もし、戻り値のUserDtoがnullの場合はisAuthedがfalseのAuthDtoを作りreturn
        UserDto userData = userService.getUserByUserId(userId);
        if (userData == null) {
            return new AuthDto(userId, false);
        }

        return new AuthDto(userId, true);
    }
}
