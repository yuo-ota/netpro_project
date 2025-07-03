export const postUserApiResponse = () => {
    return {
        userId: 'aQQbkX3iiclUTFCqwOYqx',
    };
};

export const GetAuthApiResponseReturnTrue = () => {
    return {
        userId: 'aQQbkX3iiclUTFCqwOYqx',
        isAuthed: true,
    };
};

export const GetAuthApiResponseReturnFalse = () => {
    return {
        userId: 'aQQbkX3iiclUTFCqwOYqx',
        isAuthed: false,
    };
};

export const GetPointsApiResponseReturnZero = () => {
    return [];
};

export const GetPointsApiResponseReturnOne = () => {
    return [
        {
            pointId: 'hTXvhBAj2SBiEqNFkAIY9',
            latitude: 35.395286,
            longitude: 139.557281,
        },
    ];
};

export const GetPointsApiResponseReturnFive = () => {
    return [
        {
            postCount: 0,
            symbolPoint: {
                pointId: 'p1',
                latitude: 35.0,
                longitude: 139.0,
                isUserInThisArea: true,
                postCount: 0,
            },
        },
        {
            postCount: 2,
            symbolPoint: {
                pointId: 'p2',
                latitude: 36.5,
                longitude: 140.0,
                isUserInThisArea: false,
                postCount: 2,
            },
        },
        {
            postCount: 4,
            symbolPoint: {
                pointId: 'p3',
                latitude: 34.2,
                longitude: 135.5,
                isUserInThisArea: true,
                postCount: 0,
            },
        },
        {
            postCount: 1,
            symbolPoint: {
                pointId: 'p4',
                latitude: 37.0,
                longitude: 138.0,
                isUserInThisArea: false,
                postCount: 1,
            },
        },
        {
            postCount: 3,
            symbolPoint: {
                pointId: 'p5',
                latitude: 33.0,
                longitude: 131.0,
                isUserInThisArea: true,
                postCount: 2,
            },
        },
    ];
};

export const GetPostsApiResponseReturnZero = () => {
    return [];
};

export const GetPostsApiResponseReturnOne = () => {
    return [
        {
            postId: 'A9zUKh1WKglkWy605pgTZ',
            postedTime: '2025/6/6 14:30',
            content: '街路樹の上にツバメの巣があった！',
            goodCount: 10,
        },
    ];
};

export const GetPostsApiResponseReturnFive = () => {
    return [
        {
            postId: 'FsTXU8TFBM8dC3ZRPFnw7',
            postedTime: '2025/6/10 20:30',
            content: 'ここから見える夜景が一番',
            goodCount: 10,
            isGooded: false,
        },
        {
            postId: '9v3iie_5E62rmYE-Wws7G',
            postedTime: '2025/5/9 18:00',
            content: '近所にある中華料理屋精華園さんおいしいんだよね',
            goodCount: 7,
            isGooded: true,
        },
        {
            postId: 'gcRnXSSgFgM6aFnegT34N',
            postedTime: '2025/2/30 6:30',
            content: 'なんでこんな早朝にこんなところいるんやろ...',
            goodCount: 0,
            isGooded: false,
        },
        {
            postId: 'RIesGwE4PQcOnYU3cY0p6',
            postedTime: '2025/4/10 1:00',
            content: '終電で寝過ごしてオワタ',
            goodCount: 100,
            isGooded: true,
        },
        {
            postId: 'EdCheng5AZk5u2oLRyGRJ',
            postedTime: '2025/3/5 12:30',
            content: '3年間ありがとう！次は成人式で！',
            goodCount: 100000,
            isGooded: true,
        },
    ];
};

export const PostPostsApiResponse = () => {
    return [
        {
            postId: 'xDH_sIKXGHP8hTn7-W664',
            postedTime: '2025/6/9 1:21',
            content: 'ｺｺﾄﾞｺ...',
            goodCount: 0,
        },
    ];
};

export const DeletePostsApiResponse = () => {
    return;
};

export const PATCHGoodsApiResponseReturnTrue = () => {
    return {
        postId: 'CqqbwZgfJ8mvqitFCCBwA',
        isLiked: true,
    };
};

export const PATCHGoodsApiResponseReturnFalse = () => {
    return {
        postId: 'GAvdx0lUvdtFAoJzRubU3',
        isLiked: false,
    };
};
