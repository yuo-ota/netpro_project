package jp.ac.dendai.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.GoodDto;
import jp.ac.dendai.backend.Service.GoodService;

@RestController
@RequestMapping("/goods")
public class GoodController {
    private final GoodService goodService;

    public GoodController(GoodService goodService) {
        this.goodService = goodService;
    }

    @PostMapping
    public ResponseEntity<GoodDto> createGood(
            String userId, String postId) {
        // TODO
        // goodServiceのcreateGoodを呼び出し、201番で戻り値のGoodDtoをreturn
        // AuthenticationFailedExceptionの例外の場合は、401番でreturn
        // それ以外(不正な値や例外)には500番をreturn
        return null;
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteGood(
            String userId, String postId) {
        // TODO
        // goodServiceのdeleteGoodを呼び出し、204番でreturn
        // AuthenticationFailedExceptionの例外の場合は、401番でreturn
        // それ以外(不正な値や例外)には500番をreturn
        return null;
    }
}
