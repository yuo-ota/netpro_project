package jp.ac.dendai.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Repository.PointRepository;

@Service
public class PointService {
    private final PointRepository pointRepository;

    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public PointDto getPointByPointId(String pointId) {
        // TODO
        // pointRepositoryのfindByPointIdを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        return null;
    }

    public PointDto getPointByAtPosition(Long latitude, Long longitude) {
        // TODO
        // pointRepositoryのfindByAtPositionを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        return null;
    }

    public List<PointDto> getPointsByNearPosition(Long latitude, Long longitude) {
        // TODO
        // pointRepositoryのfindByNearPositionを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は戻り値のList<Point>を基にList<PointDto>を作りreturn
        return null;
    }

    public PointDto createPoint(Long latitude, Long longitude) {
        // TODO
        // pointRepositoryのsaveを呼び出し、例外がthrowされた場合は例外をthrowしServiceに送る
        // それ以外は渡したPointを基にPointDtoを作りreturn
        return null;
    }
}
