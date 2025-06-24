package jp.ac.dendai.backend.util;

public class CalcGeo {
    /*
     * 本来は、METERS_PER_DEGREE_LATITUDEの値は極半径を基にすべきであるが、
     * 極半径 < 平均半径であるため考えないことにする
     */
    private static final double EARTH_RADIUS_METERS = 6371000; // 地球の平均半径
    private static final double METERS_PER_DEGREE_LATITUDE = 2 * Math.PI * EARTH_RADIUS_METERS / 360; // 緯度1度の距離

    /**
     *
     * @param latitude1  緯度1（度）
     * @param longitude1 経度1（度）
     * @param latitude2  緯度2（度）
     * @param longitude2 経度2（度）
     * @return 距離（メートル）
     */
    public static double haversineDistance(
            double latitude1, double longitude1, double latitude2, double longitude2) {

        double latitude1Radians = Math.toRadians(latitude1);
        double latitude2Radians = Math.toRadians(latitude2);
        double deltaLatitudeRadians = Math.toRadians(latitude2 - latitude1);
        double deltaLongitudeRadians = Math.toRadians(longitude2 - longitude1);

        double a = Math.sin(deltaLatitudeRadians / 2) * Math.sin(deltaLatitudeRadians / 2)
                + Math.cos(latitude1Radians) * Math.cos(latitude2Radians)
                        * Math.sin(deltaLongitudeRadians / 2) * Math.sin(deltaLongitudeRadians / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double distance = EARTH_RADIUS_METERS * c;
        return distance;
    }

    /**
     * @param lat            緯度
     * @param lon            経度
     * @param distanceMeters 内包する円の半径
     * @return LatLngRange latitudeのminとmax, longitudeのminとmaxを持つクラス
     */
    public static LatLngRange getBoundingBox(double lat, double lon, double distanceMeters) {
        // 緯度の変化量（メートル→度）
        double latDelta = distanceMeters / METERS_PER_DEGREE_LATITUDE;

        // 経度の変化量（緯度によって変わる）
        double lonDelta = distanceMeters / (METERS_PER_DEGREE_LATITUDE * Math.cos(Math.toRadians(lat)));

        return new LatLngRange(
                lat - latDelta,
                lat + latDelta,
                lon - lonDelta,
                lon + lonDelta);
    }

    public static double[] floorPosition(double latitude, double longitude) {
        final int GRID_EDGE_METERS = 10; // TODO グリッドの1辺の長さ 暫定値のため適宜調整すること
        final double GRID_SIZE_LAT = GRID_EDGE_METERS / METERS_PER_DEGREE_LATITUDE; // グリッド1辺の緯度
        final double GRID_SIZE_LON = GRID_SIZE_LAT / Math.cos(Math.toRadians(latitude)); // 経度方向に相当する度数

        // 丸め緯度, 経度
        double flooredLat = Math.floor(latitude / GRID_SIZE_LAT) * GRID_SIZE_LAT;
        double flooredLon = Math.floor(longitude / GRID_SIZE_LON) * GRID_SIZE_LON;

        return new double[] { flooredLat, flooredLon };
    }

    public static int getMapEdgeMetors(int mapSize) {
        int mapEdgeMetors = (int) Math.pow(2, (18 - mapSize)) * 350;
        return mapEdgeMetors;
    }

    public static void main(String[] args) {
        double tduLat = 35.7489414625941;
        double tduLon = 139.80676212563802;
        double tdu2Lat = 35.7489414625941;
        double tdu2Lon = 139.80676212573802;

        // double distance = 50;
        // LatLngRange range = getBoundingBox(tduLat, tduLon, distance);
        // System.out.printf("%.2fm以内の範囲:%n", distance);
        // System.out.println(range);

        // double resultDistance = haversineDistance(tduLat, tduLon, homeLat, homeLon);
        // System.out.printf("距離は %.2f メートルです%n", resultDistance);

        double[] flooredTduPosition = floorPosition(tduLat, tduLon);
        double[] flooredTdu2Position = floorPosition(tdu2Lat, tdu2Lon);
        System.out.println(flooredTduPosition[0] + ", " + flooredTduPosition[1]);
        System.out.println(flooredTdu2Position[0] + ", " + flooredTdu2Position[1]);
    }

    public static class LatLngRange {
        public final double minLat;
        public final double maxLat;
        public final double minLng;
        public final double maxLng;

        public LatLngRange(double minLat, double maxLat, double minLng, double maxLng) {
            this.minLat = minLat;
            this.maxLat = maxLat;
            this.minLng = minLng;
            this.maxLng = maxLng;
        }

        @Override
        public String toString() {
            return "緯度: " + minLat + "~" + maxLat + ", 経度: " + minLng + "~" + maxLng;
        }
    }
}