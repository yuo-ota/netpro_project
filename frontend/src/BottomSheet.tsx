import { useRef } from 'react';
import './App.css'
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';

function BottomSheet() {
    const MAX_HEIGHT:number = window.innerHeight * 0.65;    // 画面全体のうちどの程度をMAXとするか
    const snapOffset = 100;     // どの程度近づくことでスナップするか
    
    const rawY = useMotionValue(MAX_HEIGHT);
    const y = useSpring(rawY, { damping: 100, stiffness: 1000 });

    // スナップポイントを定義
    const SNAP_POINTS = {
        closed: MAX_HEIGHT, // 完全に閉じている状態
        open: 0, // 完全に開いている状態
    };

    const dragHandleProps = useDragControls();

    // ボトムシートを指定したスナップポイントに移動させる関数
    const snapTo = (point: number) => {
        rawY.set(point);
    };

    

    return (
        <>
        <Box className="flex justify-center items-center h-screen bg-gray-100 relative overflow-hidden">
            <motion.div
                className="flex flex-col fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-20 mb-[-300px]"
                style={{ y }}
                drag="y"
                dragConstraints={{
                    top: 0,
                    bottom: MAX_HEIGHT,
                }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={() => {
                    const currentY = y.get(); // useSpring の y から現在の値を取得

                    if (Math.abs(currentY - SNAP_POINTS.closed) < snapOffset) {
                        snapTo(SNAP_POINTS.open);
                        snapTo(SNAP_POINTS.closed);
                    } else if (Math.abs(currentY - SNAP_POINTS.open) < snapOffset) {
                        snapTo(SNAP_POINTS.closed);
                        snapTo(SNAP_POINTS.open);
                    }
                }}
                dragSnapToOrigin={false}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 25 }}
                onPointerDown={(event) => dragHandleProps.start(event)}
            >
                {/* ドラッグハンドル */}
                <Box
                    className="flex-none w-12 h-1.5 my-[20px] bg-gray-300 rounded-full mx-auto my-3 cursor-grab active:cursor-grabbing"
                    onPointerDown={(e) => {
                    e.stopPropagation();
                    dragHandleProps.start(e);
                    }}
                />

                {/* ここからがコンテンツエリア */}
                <Box
                    style={{ maxHeight: Math.min(MAX_HEIGHT) + 'px' }} // ハンドルの高さとパディングを考慮して最大高さを設定
                    overflowY="auto" // 縦方向のスクロールを自動で表示
                    className="p-4 pt-0 flex-1"
                >
                    <Button onClick={() => snapTo(SNAP_POINTS.open)} colorScheme="red" className="w-full mt-4">
                        ボトムシートを閉じる
                    </Button>
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
                    <Button onClick={() => snapTo(SNAP_POINTS.open)} colorScheme="red" className="w-full mt-4">
                        ボトムシートを閉じる
                    </Button>
                </Box>
                <div className='w-full h-[300px] flex-none'></div>
            </motion.div>
        </Box>
        </>
    )
}

export default BottomSheet