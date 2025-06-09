package jp.ac.dendai.backend.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    // TODO: ここから続きかな
    private UserService userService;
}
