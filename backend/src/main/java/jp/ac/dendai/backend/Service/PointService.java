package jp.ac.dendai.backend.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import jp.ac.dendai.backend.Dto.PointDto;
import jp.ac.dendai.backend.Dto.PointManageDto;
import jp.ac.dendai.backend.Entity.Point;
import jp.ac.dendai.backend.Repository.PointRepository;
import jp.ac.dendai.backend.util.CalcGeo;
import jp.ac.dendai.backend.util.NanoIdGenerator;
import jp.ac.dendai.backend.util.CalcGeo.LatLngRange;

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
        // floorPosition関数で誤差を吸収する
        double[] flooredPosition = CalcGeo.floorPosition(latitude, longitude, 10/*適当*/);

        // 助けて！！引数に入れる値がわからない↑

        Point pointData = pointRepository.findByAtPosition(flooredPosition[0], flooredPosition[1]);
        if (pointData == null){
            return null;
        }
        return new PointDto(pointData.getPointId(), latitude, longitude);
    }

    public List<PointManageDto> getPointsByNearPosition(double latitude, double longitude, int mapSize) {
        // TODO
        // mapSizeの値をもとに適切な範囲を取得する
        // pointRepositoryのfindByNearPositionを呼び出す
        // 受け取ったデータのうち、1つづつmapSizeに合わせて座標を丸める
        // またユーザーの範囲内の場合にはsetIsUserInThisAreaを呼び出してtrueにする
        // これらを別のArrayListに入れてList<PointDto>をreturn

        /** @author つな　*/
        /*
         * 地図のサイズによってどのくらいの範囲でpointを探せばいいのか変わるよねっていうのがこの関数の発想で
         * mapSizeはその範囲の算定のために用意しています。
         * 肝心のmapSizeに対応する範囲はどのくらいかっていうのはCalcGeoのmapEdgeMetorsで、
         * その範囲が取れたらfindByNearPositionに対して検索をまずは掛けます。
         *
         * そしたら一辺100kmのサイズで表示している地図で10mの距離のpointはまとめた方がいいよねっていうのが後半の発想で、
         * Map<double[], PointManage>で管理します。
         * doulbe[]は丸めた後の緯度経度の組、PointManageDtoは代表地点のPointDtoといくつこの範囲にあるのかの数を持つ
         * 例えば2km区画でまとめていくとすると、その範囲に今までのpointは存在しない場合は新たに作成
         * 存在する場合にはPointManageDtoをインクリメントします。
         * 最後にPointManageDtoを返せばこの関数は終了です。
         */

        // TODO ここで範囲を取得

        int mapEdgeMetors = CalcGeo.getMapEdgeMetors(mapSize);
        LatLngRange boundBox = CalcGeo.getBoundingBox(latitude, longitude, mapEdgeMetors);
        List<Point> pointsData = pointRepository.findByNearPosition(boundBox);
        if (pointsData == null){
            return null;
        }
        Map<String, PointManageDto> roundPoints = new HashMap();
        for (int i = 0; i < pointsData.size(); i++){
            // floorPositionでまるめた緯度経度を作る
            double[] flooredPosition = CalcGeo.floorPosition(pointsData.get(i).getLatitude(), pointsData.get(i).getLongitude(), mapEdgeMetors / 20);
            // double[]のため、containsKey(flooredPosition) は常にfalseとなる可能性が高い、らしい…
            // そのためMapのkeyとしてString型のkeyを生成
            String key = flooredPosition[0] + "_" + flooredPosition[1];
            if (roundPoints.containsKey(key)){ //keyがMap入っていればインクリメント
                roundPoints.get(key).incrementCount();
            } else { // 入っていなければ新しくPointManagedDtoを作る
                roundPoints.put(key, new PointManageDto(new PointDto(null/*ここどうする？ */, flooredPosition[0], flooredPosition[1])));            }
        }
        // value部分（PointManageDto）のListをreturn
        return new ArrayList<>(roundPoints.values());
    }

    public PointDto createPoint(double latitude, double longitude) {
        // pointRepositoryのsaveを呼び出す
        // それ以外は渡したPointを基にPointDtoを作りreturn

        String pointId = NanoIdGenerator.generate();
        Point pointData = new Point(pointId, latitude, longitude);
        pointRepository.save(pointData);
        return new PointDto(pointData.getPointId(), pointData.getLatitude(), pointData.getLongitude());
    }
}