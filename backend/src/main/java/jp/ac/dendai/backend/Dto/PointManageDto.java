package jp.ac.dendai.backend.Dto;

public class PointManageDto {
    PointDto symbolPoint;
    int pointCount;

    public PointManageDto(PointDto symbolPoint) {
        this.symbolPoint = symbolPoint;
        pointCount = 1;
    }

    public void incrementCount() {
        pointCount++;
    }

    public PointDto getSymbolPoint() {
        return symbolPoint;
    }
    public int getPointCount() {
        return pointCount;
    }
}
