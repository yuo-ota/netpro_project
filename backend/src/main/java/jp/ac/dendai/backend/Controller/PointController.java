package jp.ac.dendai.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Service.PointService;

@RestController
@RequestMapping("/points")
public class PointController {
    private PointService pointService;

    public PointController(PointService pointService){
        this.pointService = pointService;
    }

    @GetMapping("/{latitude}/{longitude}")
    public ResponseEntity<List<PointDto>> getPoints(Long latitude, Long longitude){
        return null;
    }
}
