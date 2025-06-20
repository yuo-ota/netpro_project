package jp.ac.dendai.backend.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Service.PointService;

@RestController
@RequestMapping("/points")
public class PointController {
    private final PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @GetMapping("/{latitude}/{longitude}/{mapSize}")
    public ResponseEntity<List<PointDto>> getPoints(double latitude, double longitude, int mapSize) {
        // pointServiceのgetPointsByNearPositionを呼び出し、
        // もし、nullでない場合には200番で戻り値のList<PointDto>をreturn
        // それ以外(不正な値や例外)には500番でreturn
        try {
            List<PointDto> pointData = pointService.getPointsByNearPosition(latitude, longitude, mapSize);

            if (pointData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.ok(pointData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
