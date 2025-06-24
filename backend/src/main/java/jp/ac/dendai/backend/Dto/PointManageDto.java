package jp.ac.dendai.backend.Dto;

public class PointManageDto {
    PointDto symbolPoint;
    int pointCount;
    int goodCount;

    public PointManageDto(PointDto symbolPoint) {
        this.symbolPoint = symbolPoint;
        pointCount = 1;
    }

    public void incrementCount() {
        pointCount++;
    }

    public void addGoodCount(int i) {
        goodCount += i;
    }

    public PointDto getSymbolPoint() {
        return symbolPoint;
    }

    public int getPointCount() {
        return pointCount;
    }

    public int getGoodCount() {
        return goodCount;
    }
}
