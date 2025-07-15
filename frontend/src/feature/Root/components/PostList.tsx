import { Box, Tabs, Text, VStack, Button, Menu, Portal } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { type Post } from '@/types/Post';
import { isGood, type Good } from '@/types/Good';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import thumbUpIcon from '../assets/thumb_up_icon.svg';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

type PostListProps = {
    height: number;
    posts: Post[];
    setIsSortByTime: (isSortByTime: boolean) => void;
    setPosts: (posts: Post[]) => void;
    getViewRangePointList: () => void;
    setIsOpenErrorDialog: (isOpenErrorDialog: boolean) => void;
    setErrorTitle: (errorTitle: string) => void;
    setErrorDetail: (errorDetail: string[]) => void;
};

const PostList: React.FC<PostListProps> = ({
    height,
    posts,
    setIsSortByTime,
    setPosts,
    getViewRangePointList,
    setIsOpenErrorDialog,
    setErrorTitle,
    setErrorDetail,
}) => {
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/unauthorized');
        }
    }, [userId]);

    const tabsChanged = (value: string): void => {
        console.log(value);
        if (value === 'likes') {
            setIsSortByTime(false);
            return;
        }

        setIsSortByTime(true);
        return;
    };

    useEffect(() => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }
    }, [userId]);

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);

        const formatted = new Intl.DateTimeFormat('ja-JP', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);

        return formatted;
    };

    const createGood = async (postId: string) => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }

        try {
            const response = await fetch(`${API_ORIGIN}/api/goods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                }),
            });

            // ステータスコードで判定
            if (response.status === 201) {
                const data = await response.json();
                console.log(data);
                if (!isGood(data)) {
                    throw new Error();
                }

                const responsedGoodObj = data as Good;
                const updatePosts = posts.map((post) =>
                    post.postId === responsedGoodObj.postId
                        ? { ...post, isGooded: true, goodCount: post.goodCount + 1 }
                        : post
                );

                setPosts(updatePosts);
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([
                    `ユーザーIDが不正な疑いがあります。`,
                    `ページを更新してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
        }
    };

    const deleteGood = async (postId: string) => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }

        try {
            const response = await fetch(`${API_ORIGIN}/api/goods`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                }),
            });

            // ステータスコードで判定
            if (response.status === 204) {
                console.log('1', posts);
                const updatePosts = posts.map((post) =>
                    post.postId === postId
                        ? { ...post, isGooded: false, goodCount: post.goodCount - 1 }
                        : post
                );
                console.log('2', updatePosts);

                setPosts(updatePosts);
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([
                    `ユーザーIDが不正な疑いがあります。`,
                    `ページを更新してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
        }
    };

    const deletePost = async (postId: string) => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }

        try {
            const response = await fetch(`${API_ORIGIN}/api/posts`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                }),
            });

            // ステータスコードで判定
            if (response.status === 204) {
                const updatePosts = posts.filter((post) => post.postId !== postId);
                if (updatePosts.length === 0) {
                    getViewRangePointList();
                }

                setPosts(updatePosts);
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([
                    `ユーザーIDが不正な疑いがあります。`,
                    `ページを更新してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
        }
    };

    return (
        <>
            <Tabs.Root
                defaultValue={'likes'}
                className="w-full sticky top-0 z-200"
                onValueChange={(e) => tabsChanged(e.value)}
            >
                <Tabs.List
                    className="
                    flex
                    border-t-2
                    mb-[3px]
                    shadow-[0_3px_3px_rgba(0,0,0,0.2)]
                    bg-white
                    z-[var(--chakra-zIndices-docked)]"
                >
                    <Tabs.Trigger
                        value="likes"
                        colorPalette="main"
                        css={{ '--indicator-color': 'var(--color-main)' }}
                        className="
                        flex-1
                        py-7
                        text-lg
                        text-center
                        justify-center
                        items-center
                        bg-white"
                        onClick={() => setIsSortByTime(false)}
                    >
                        いいね順
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="newest"
                        colorPalette="main"
                        css={{ '--indicator-color': 'var(--color-main)' }}
                        className="
                        flex-1
                        py-7
                        text-lg
                        text-center
                        justify-center
                        items-center
                        bg-white"
                        onClick={() => setIsSortByTime(true)}
                    >
                        投稿順
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
            {/* <Box className='flex flex-col h-screen'> */}
            <Box
                className="
                flex-1
                overflow-y-auto
                px-4
                pt-4"
            >
                <VStack
                    className="gap-4 flex items-stretch"
                    style={{ minHeight: `${height + 8}px` }}
                >
                    {posts.length === 0 ? (
                        <Box className="w-full p-4 text-center text-gray-500">
                            <Text>表示する投稿がありません。</Text>
                        </Box>
                    ) : (
                        <>
                        {posts.map((post, i) => (
                            <Box
                                key={i}
                                className="
                                w-full
                                p-4
                                bg-white
                                border-b
                                border-gray-200
                                last:border-b-0"
                            >
                                <div className="relative flex items-start">
                                    <Box className="flex-1 pr-4">
                                        <Text className="text-base mb-2">{post.content}</Text>
                                        <Text className="text-sm text-gray-500">
                                            {formatTime(post.postedTime)}
                                        </Text>
                                    </Box>
                                    <div
                                        className="
                                        flex
                                        flex-col
                                        items-center
                                        mr-2"
                                    >
                                        {post.isGooded ? (
                                            <Button
                                                className="
                                                w-[12vh]
                                                h-[12vh]
                                                rounded-full
                                                bg-main
                                                border-[2px]
                                                border-main
                                                shadow-[0px_0px_5px_var(--color-main-shadow)]
                                                flex
                                                items-center
                                                justify-center
                                                mb-2
                                                mr-2"
                                                onClick={() => deleteGood(post.postId)}
                                            >
                                                <img
                                                    src={thumbUpIcon}
                                                    alt="いいねアイコン"
                                                    className="w-3/5 h-auto ml-[5%] mb-[5%]"
                                                />
                                            </Button>
                                        ) : (
                                            <Button
                                                className="
                                                w-[12vh]
                                                h-[12vh]
                                                rounded-full
                                                bg-white
                                                border-[2px]
                                                border-main
                                                shadow-[0px_0px_5px_var(--color-main-shadow)]
                                                flex
                                                items-center
                                                justify-center
                                                mb-2
                                                mr-2"
                                                onClick={() => createGood(post.postId)}
                                            >
                                                <img
                                                    src={thumbUpIcon}
                                                    alt="いいねアイコン"
                                                    className="w-3/5 h-auto ml-[5%] mb-[5%]"
                                                />
                                            </Button>
                                        )}
                                        <Text className="text-sm font-bold">{post.goodCount}</Text>
                                    </div>
                                    <Menu.Root>
                                        <Menu.Trigger asChild>
                                            <Button className="absolute -right-4 -top-4 bg-white rounded-full aspect-square">
                                                <FaEllipsisV className="w-9/10 h-9/10 text-[#2A2A2A]" />
                                            </Button>
                                        </Menu.Trigger>
                                        <Portal>
                                            <Menu.Positioner>
                                                <Menu.Content>
                                                    <Menu.Item value="share">
                                                        共有リンクを発行
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        value="delete"
                                                        color="fg.error"
                                                        _hover={{
                                                            bg: 'bg.error',
                                                            color: 'fg.error',
                                                        }}
                                                        onClick={() => deletePost(post.postId)}
                                                    >
                                                        削除する
                                                    </Menu.Item>
                                                </Menu.Content>
                                            </Menu.Positioner>
                                        </Portal>
                                    </Menu.Root>
                                </div>
                            </Box>
                        ))}
                        <div className="h-20 flex justify-center items-center">
                            <Text className="text-lg text-gray-500">コンテンツの終わりです。</Text>
                        </div>
                        </>
                    )}
                    
                </VStack>
            </Box>
        </>
    );
};

export default PostList;
