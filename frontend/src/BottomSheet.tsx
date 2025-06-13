import './App.css'
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';

function BottomSheet() {
    const MAX_HEIGHT:number = window.innerHeight * 0.65;    // 画面全体のうちどの程度をMAXとするか
    const snapOffset = window.innerHeight * 0.05;     // どの程度近づくことでスナップするか
    const [isOpened, setIsOpened] = useState<boolean>(false);
    
    const rawY = useMotionValue(MAX_HEIGHT);
    const y = useSpring(rawY, { damping: 100, stiffness: 500 });

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
            <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-20"
                style={{ y }}
                drag="y"
                dragConstraints={{
                    top: SNAP_POINTS.open,
                    bottom: SNAP_POINTS.closed,
                }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={() => {
                    const currentY = y.get(); // useSpring の y から現在の値を取得
                    if (isOpened) {
                        if (Math.abs(currentY - SNAP_POINTS.open) > snapOffset) {
                            snapTo(SNAP_POINTS.open);
                            snapTo(SNAP_POINTS.closed);
                            setIsOpened(false);
                        } else {
                            snapTo(SNAP_POINTS.closed);
                            snapTo(SNAP_POINTS.open);
                        }
                    } else {
                        if (Math.abs(currentY - SNAP_POINTS.closed) > snapOffset) {
                            snapTo(SNAP_POINTS.closed);
                            snapTo(SNAP_POINTS.open);
                            setIsOpened(true);
                        } else {
                            snapTo(SNAP_POINTS.open);
                            snapTo(SNAP_POINTS.closed);
                        }
                    }
                    
                }}
                dragSnapToOrigin={false}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 25 }}
                onPointerDown={(event) => dragHandleProps.start(event)}
            >
                {/* ドラッグハンドル */}
                <Box
                    className="w-12 h-1.5 my-[40px] bg-gray-500 rounded-full mx-auto my-3 cursor-grab active:cursor-grabbing"
                    onPointerDown={(e) => {
                    e.stopPropagation();
                    dragHandleProps.start(e);
                    }}
                />

                {/* ここからがコンテンツエリア */}
                <Box
                    style={{ maxHeight: `${MAX_HEIGHT}px` }}
                    className={`p-4 pt-0 overflow-y-auto bg-white`}
                >
                    <VStack spaceY={4} align="stretch">
                        {[...Array(20)].map((_, i) => (
                            <Box key={i} p={3} borderWidth="1px" borderRadius="lg" bg="gray.50">
                            <Text fontWeight="bold">リストアイテム #{i + 1}</Text>
                            <Text fontSize="sm" color="gray.800">
                                これはボトムシート内のスクロール可能なコンテンツです。
                                長いテキストが入ることもあります。
                            </Text>
                            <Button size="sm" mt={2}>
                                詳細を見る
                            </Button>
                            </Box>
                        ))}
                        <Text fontSize="sm" color="gray.500">
                            コンテンツの終わりです。
                        </Text>
                    </VStack>

                    
                    <Button onClick={() => snapTo(SNAP_POINTS.closed)} className="w-full mt-4">
                        ボトムシートを閉じる
                    </Button>
                </Box>
                {/* <div className='w-full h-[300px] flex-none'></div> */}
            </motion.div>
        </>
    )
}

export default BottomSheet