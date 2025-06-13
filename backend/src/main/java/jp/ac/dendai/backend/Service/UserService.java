package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.UserDto;
import jp.ac.dendai.backend.Repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserByUserId(String userID) {
        // TODO
        // userRepositoryのfindByUserIdを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のUserを基にUserDtoを作りreturn
        return null;
    }

    public UserDto createUser() {
        // TODO
        // userRepositoryのsaveを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は渡したUser基にUserDtoを作りreturn
        return null;
    }
}