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
        // pointRepositoryのfindByPointIdを呼び出す
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        return null;
    }

    public PointDto getPointByAtPosition(double latitude, double longitude) {
        // TODO
        // pointRepositoryのfindByAtPositionを呼び出す
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        return null;
    }

    public List<PointDto> getPointsByNearPosition(double latitude, double longitude, int mapSize) {
        // TODO
        // mapSizeの値をもとに適切な範囲を取得する
        // pointRepositoryのfindByNearPositionを呼び出す
        // 受け取ったデータのうち、1つづつmapSizeに合わせて座標を丸める
        // またユーザーの範囲内の場合にはsetIsUserInThisAreaを呼び出してtrueにする
        // これらの別のArrayListに入れてList<PointDto>をreturn
        return null;
    }

    public PointDto createPoint(double latitude, double longitude) {
        // TODO
        // pointRepositoryのsaveを呼び出す
        // それ以外は渡したPointを基にPointDtoを作りreturn
        return null;
    }
}
