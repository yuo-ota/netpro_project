package jp.ac.dendai.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<AuthDto> getAuth(String UserId) {
        // TODO
        // authServiceのgetAuthByUserIdを呼び出し、
        // もし、isAuthedがtrueなら200番で戻り値のAuthDtoをreturn
        // もし、isAuthedがfalseなら401番でnullをreturn
        // もし、nullの場合には204でnullをreturn
        // それ以外(不正な値や例外)には、500番をreturn
        return null;
    }
}
