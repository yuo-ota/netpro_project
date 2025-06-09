package jp.ac.dendai.backend.Service;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserDto getUserByUserId(String userID){

    }

    public UserDto createUser(){
        
    }
}
