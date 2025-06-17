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
     * @param latitude1 緯度1（度）
     * @param longitude1 経度1（度）
     * @param latitude2 緯度2（度）
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
     * @param lat 緯度
     * @param lon 経度
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
                lon + lonDelta
        );
    }

    public static void main(String[] args) {
        double tduLat = 35.7489414625941;
        double tduLon = 139.80676212563802;
        double homeLat = 35.7489414625941;
        double homeLon = 139.80731617842014;

        double distance = 50;
        LatLngRange range = getBoundingBox(tduLat, tduLon, distance);
        System.out.printf("%.2fm以内の範囲:%n", distance);
        System.out.println(range);

        double resultDistance = haversineDistance(tduLat, tduLon, homeLat, homeLon);
        System.out.printf("距離は %.2f メートルです%n", resultDistance);
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