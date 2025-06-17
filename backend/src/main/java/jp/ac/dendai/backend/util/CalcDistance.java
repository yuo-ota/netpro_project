package jp.ac.dendai.backend.util;

public class CalcDistance {
    // 日本における地球の半径
    private static final double EARTH_RADIUS_METERS = 6371000;
    
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

    public static void main(String[] args) {
        double tduLat = 35.7489414625941;
        double tduLon = 139.80676212563802;
        double homeLat = 35.39577592796759;
        double homeLon = 139.55698007560935;

        double distance = haversineDistance(tduLat, tduLon, homeLat, homeLon);
        System.out.printf("距離は %.2f メートルです%n", distance);
    }
}