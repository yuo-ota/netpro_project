package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.AuthDto;

@Service
public class AuthService {
    private UserService userService;

    public AuthService(UserService userService){
        this.userService = userService;
    }

    public AuthDto getAuthByUserId(String userId){
        return null;
    }
}
