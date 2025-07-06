package jp.ac.dendai.backend.Dto;

public class PointManageDto {
    PointDto symbolPoint;
    int postCount;

    public PointManageDto(PointDto symbolPoint) {
        this.symbolPoint = symbolPoint;

        int i = symbolPoint.getPostCount();
        if (i == -1) {
            postCount = 0;
            return;
        }
        postCount = i;
    }

    public void incrementCount(int i) {
        postCount += i;
    }

    public PointDto getSymbolPoint() {
        return symbolPoint;
    }

    public int getPostCount() {
        return postCount;
    }
}
