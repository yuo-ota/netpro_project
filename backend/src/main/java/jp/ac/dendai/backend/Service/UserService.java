package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.UserDto;
import jp.ac.dendai.backend.Entity.User;
import jp.ac.dendai.backend.Repository.UserRepository;
import jp.ac.dendai.backend.util.NanoIdGenerator;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserByUserId(String userId) {
        // userRepositoryのfindByUserIdを呼び出す
        // もし戻り値のUserがnullの場合はnullをreturn
        // それ以外は戻り値のUserを基にUserDtoを作りreturn
        User userData = userRepository.findByUserId(userId);
        if (userData == null) {
            return null;
        }
        return new UserDto(userData.getUserId());
    }

    public UserDto createUser() {
        // userRepositoryのsaveを呼び出す
        // それ以外は渡したUser基にUserDtoを作りreturn
        String userId = NanoIdGenerator.generate();
        User user = new User(userId);
        userRepository.save(user);
        return new UserDto(user.getUserId());
    }
}