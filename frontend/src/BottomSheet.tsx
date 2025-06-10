import { useRef } from 'react';
import './App.css'
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';

function BottomSheet() {
    const constraintsRef = useRef(null);
    const rawY = useMotionValue(0); // 生のY座標のモーション値（ドラッグ量）
    // useSpring を使って、アニメーションプロパティを持つ Y モーション値を作成
    const y = useSpring(rawY, { damping: 25, stiffness: 250 }); // 第二引数でスプリングプロパティを設定

    // スナップポイントを定義
    const SNAP_POINTS = {
        closed: 300, // 完全に閉じている状態
        open: -300, // 完全に開いている状態
    };
    const MAX_HEIGHT = -SNAP_POINTS.open;

    const dragHandleProps = useDragControls();

  // ボトムシートを指定したスナップポイントに移動させる関数
    const snapTo = (point: number) => {
        rawY.set(point); // useSpring で作成した y ではなく、生の rawY を更新
    };

    

    return (
        <>
        <Box className="flex justify-center items-center h-screen bg-gray-100 relative overflow-hidden">
            {/* ドラッグ範囲を制限するコンテナ (スクリーン全体または特定の領域) */}
            <Box ref={constraintsRef} className="absolute inset-0 z-0" style={{ top: '50px' }} />

            <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-20"
                style={{ y }}
                drag="y"
                dragConstraints={{
                    top: 0,
                    bottom: 600,
                }}
                //dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(event, info) => {
                    const currentY = y.get(); // useSpring の y から現在の値を取得
                    const threshold = SNAP_POINTS.open / 2;

                    if (currentY > threshold) {
                        snapTo(SNAP_POINTS.closed);
                    } else {
                        snapTo(SNAP_POINTS.open);
                    }
                }}
                dragSnapToOrigin={false}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
                onPointerDown={(event) => dragHandleProps.start(event)}
            >
                {/* ドラッグハンドル */}
                <Box
                    className="w-12 h-1.5 my-[20px] bg-gray-300 rounded-full mx-auto my-3 cursor-grab active:cursor-grabbing"
                    onPointerDown={(e) => {
                    e.stopPropagation();
                    dragHandleProps.start(e);
                    }}
                />

                {/* ここからがコンテンツエリア */}
                <Box
                    className="p-4 pt-0"
                    style={{ maxHeight: MAX_HEIGHT + 300 + 'px' }} // ハンドルの高さとパディングを考慮して最大高さを設定
                    overflowY="auto" // 縦方向のスクロールを自動で表示
                >
                    <Text className="text-xl font-bold mb-2">ボトムシートのタイトル</Text>
                    <Text className="text-gray-700 mb-4">
                    このエリアに多くのコンテンツが配置され、スクロール可能になります。
                    </Text>

                    {/* 例として、多くの要素を連ねてみます */}
                    <VStack spaceY={4} align="stretch">
                        {[...Array(20)].map((_, i) => (
                            <Box key={i} p={3} borderWidth="1px" borderRadius="lg" bg="gray.50">
                            <Text fontWeight="bold">リストアイテム #{i + 1}</Text>
                            <Text fontSize="sm" color="gray.600">
                                これはボトムシート内のスクロール可能なコンテンツです。
                                長いテキストが入ることもあります。
                            </Text>
                            <Button size="sm" mt={2} colorScheme="teal">
                                詳細を見る
                            </Button>
                            </Box>
                        ))}
                        <Text fontSize="sm" color="gray.500">
                            コンテンツの終わりです。
                        </Text>
                    </VStack>

                    <Button onClick={() => snapTo(SNAP_POINTS.closed)} colorScheme="red" className="w-full mt-4">
                        ボトムシートを閉じる
                    </Button>
                </Box>
            </motion.div>
        </Box>
        </>
    )
}

export default BottomSheet