package jp.ac.dendai.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.UserDto;
import jp.ac.dendai.backend.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser() {
        // TODO
        // userServiceのcreateUserを呼び出し、201番で戻り値のUserDtoをreturn
        // それ以外(不正な値や例外)には500番でreturn
        return null;
    }
}
