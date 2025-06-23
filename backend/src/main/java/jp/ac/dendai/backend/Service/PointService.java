package jp.ac.dendai.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.Repository.PointRepository;

@Service
public class PointService {
    private final PointRepository pointRepository;

    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public PointDto getPointByPointId(String pointId) {
        // pointRepositoryのfindByPointIdを呼び出す
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        Point pointData = pointRepository.findByPointId(pointId);
        if (pointData == null){
            return null;
        }
        return new PointDto(pointId, pointData.getLatitude(), pointData.getLongitude());
    }

    public PointDto getPointByAtPosition(double latitude, double longitude) {
        // pointRepositoryのfindByAtPositionを呼び出す
        // それ以外は戻り値のPointを基にPointDtoを作りreturn
        Point pointData = pointRepository.findByAtPosition(latitude, longitude);
        if (pointData == null){
            return null;
        }
        return new PointDto(pointData.getPointId(), latitude, longitude);
    }

    public List<PointDto> getPointsByNearPosition(double latitude, double longitude, int mapSize) {
        // TODO
        // mapSizeの値をもとに適切な範囲を取得する
        // pointRepositoryのfindByNearPositionを呼び出す
        // 受け取ったデータのうち、1つづつmapSizeに合わせて座標を丸める
        // またユーザーの範囲内の場合にはsetIsUserInThisAreaを呼び出してtrueにする
        // これらを別のArrayListに入れてList<PointDto>をreturn

        // // mapSizeの値をもとに適切な範囲を取得するためにはfindByNearPositionの引数にmapSizeを入れる？
        // // わかりませんでした。LatlngRangeの最後の引数がmapSize?
        List<Point> pointsData = pointRepository.findByNearPosition(latitude, longitude);
        if (pointsData == null){
            return null;
        }

        List<PointDto> roundPointsData = new ArrayList<>();
        for (Point row : pointsData){
            // // mapSizeが「小数点第〇位」で丸めるための〇であると解釈して丸めました。
            double scale = Math.pow(10, mapSize);
            // // mapSizeの小数点範囲がそのまま丸める範囲である解釈。例）mapSize=12.345→小数点第三位まで
            // // String str = Integer.toString(mapSize);
            // // String[] strs = str.split(".");
            // // int decimalPlaces = strs[1].length();
            // // double scale = Math.pow(10, decimalPlaces);

            double roundedLat = Math.round(row.getLatitude() * scale) / scale;
            double roundedLng = Math.round(row.getLongitude() * scale) / scale;

            // // ユーザーの範囲内の場合という検査方法がわかりませんでした
            roundPointsData.add(new PointDto(row.getPointId(), row.getLatitude(), row.getLongitude()));
            roundPointsData.get(roundPointsData.size()-1).setIsUserInThisArea(true);
        }

        return roundPointsData;
    }

    public PointDto createPoint(double latitude, double longitude) {
        // TODO
        // pointRepositoryのsaveを呼び出す
        // それ以外は渡したPointを基にPointDtoを作りreturn

        // // pointIdを新規のために作っている場所がないのかも？
        // // PointDto作るためにデータベースからpointIdをとってくるメソッドになっちゃいました。
        Point pointData = pointRepository.findByAtPosition(latitude, longitude);
        pointRepository.save(pointData);
        return new PointDto(pointData.getPointId(), latitude, longitude);
    }
}
