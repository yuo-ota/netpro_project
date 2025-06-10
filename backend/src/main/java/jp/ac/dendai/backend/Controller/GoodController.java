package jp.ac.dendai.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.GoodDto;
import jp.ac.dendai.backend.Service.GoodService;

@RestController
@RequestMapping("/goods")
public class GoodController {
    private GoodService goodService;

    public ResponseEntity<GoodDto> changGood(String userId, String postId, boolean isLinked){
        return null;
    }
}
