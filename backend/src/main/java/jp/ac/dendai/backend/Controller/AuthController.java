package jp.ac.dendai.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.AuthDto;
import jp.ac.dendai.backend.Service.AuthService;
import jp.ac.dendai.backend.util.NanoIdGenerator;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
        // authServiceのgetAuthByUserIdを呼び出し、
        // もし、nullの場合には204でreturn
        // もし、isAuthedがtrueなら200番で戻り値のAuthDtoをreturn
        // もし、isAuthedがfalseなら401番でreturn
        // それ以外(不正な値や例外)には、500番でreturn
        try {
            AuthDto authData = authService.getAuthByUserId(UserId);
            if (authData == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            Boolean isAuthed = authData.getIsAuthed();
            if (isAuthed) {
                return ResponseEntity.status(HttpStatus.OK).body(authData);
            } else if (!isAuthed) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            } else { // isAuthedがnullなど
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
