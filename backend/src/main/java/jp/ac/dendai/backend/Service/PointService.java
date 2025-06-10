package jp.ac.dendai.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Repository.PointRepository;

@Service
public class PointService {
    private PointRepository pointRepository;

    public PointService(PointRepository pointRepository){
        this.pointRepository = pointRepository;
    }

    public PointDto getPointByPointId(String pointId){
        return null;
    }

    public PointDto getPointByAtPosition(Long latitude, Long longitude){
        return null;
    }

    public List<PointDto> getPointsByNearPosition(Long latitude, Long longitude){
        return null;
    }

    public PointDto createPoint(Long latitude, Long longitude){
        return null;
    }
}
