import { Box, Button } from '@chakra-ui/react';
import { motion, useDragControls, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import PostList from './PostList';
import type { Post } from '@/types/Post';

type BottomSheetProps = {
    posts: Post[];
    setIsSortByTime: (isSortByTime: boolean) => void;
    setPosts: (posts: Post[]) => void;
    getViewRangePointList: () => void;
    setIsOpenErrorDialog: (isOpenErrorDialog: boolean) => void;
    setErrorTitle: (errorTitle: string) => void;
    setErrorDetail: (errorDetail: string[]) => void;
    isOpened: boolean;
    setIsOpened: (isOpened: boolean) => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
    posts,
    setIsSortByTime,
    setPosts,
    getViewRangePointList,
    setIsOpenErrorDialog,
    setErrorTitle,
    setErrorDetail,
    isOpened,
    setIsOpened,
}) => {
    const MAX_HEIGHT: number = window.innerHeight * 0.65; // 画面全体のうちどの程度をMAXとするか
    const snapOffset = window.innerHeight * 0.05; // どの程度近づくことでスナップするか

    const rawY = useMotionValue(MAX_HEIGHT);
    const y = useSpring(rawY, { damping: 100, stiffness: 500 });

    useEffect(() => {
        if (isOpened) {
            openBottomSheet();
        } else {
            closeBottomSheet();
        }
    }, [isOpened]);

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

    const openBottomSheet = () => {
        snapTo(SNAP_POINTS.closed);
        snapTo(SNAP_POINTS.open);
    };

    const closeBottomSheet = () => {
        snapTo(SNAP_POINTS.open);
        snapTo(SNAP_POINTS.closed);
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
                            setIsOpened(false);
                        } else {
                            openBottomSheet();
                        }
                    } else {
                        if (Math.abs(currentY - SNAP_POINTS.closed) > snapOffset) {
                            setIsOpened(true);
                        } else {
                            closeBottomSheet();
                        }
                    }
                }}
                dragSnapToOrigin={false}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 25 }}
                onPointerDown={(event) => dragHandleProps.start(event)}
            >
                {/* ドラッグハンドル */}
                <Box
                    className="w-12 h-1.5 my-[40px] bg-gray-500 rounded-full mx-auto cursor-grab active:cursor-grabbing"
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        dragHandleProps.start(e);
                    }}
                />

                {/* ここからがコンテンツエリア */}
                <Box
                    style={{ maxHeight: `${MAX_HEIGHT}px` }}
                    className={`overflow-y-auto bg-white`}
                >
                    <PostList
                        height={MAX_HEIGHT - 142}
                        posts={posts}
                        setIsSortByTime={setIsSortByTime}
                        setPosts={setPosts}
                        getViewRangePointList={getViewRangePointList}
                        setIsOpenErrorDialog={setIsOpenErrorDialog}
                        setErrorTitle={setErrorTitle}
                        setErrorDetail={setErrorDetail}
                    />
                    <Button onClick={() => snapTo(SNAP_POINTS.closed)} className="w-full mt-4">
                        ボトムシートを閉じる
                    </Button>
                </Box>
                {/* <div className='w-full h-[300px] flex-none'></div> */}
            </motion.div>
        </>
    );
};

export default BottomSheet;
