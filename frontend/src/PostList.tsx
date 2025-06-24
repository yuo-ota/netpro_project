import { Box, Tabs, Text, VStack, Button, Menu, Portal} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { GetPostsApiResponseReturnFive } from './mock';
import type { Post } from './types/Post';

type PostListProps = {
    posts: Post[];
    setIsSortByTime: (isSortByTime: boolean) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, setIsSortByTime }) => {
    const tabsChanged = (value: string): void => {
        console.log(value);
        if (value === "likes") {
            setIsSortByTime(false);
            return;
        }

        setIsSortByTime(true);
        return;
    }

    return (
    <>
        <Tabs.Root
            defaultValue={"likes"}
            className='w-full sticky top-0 z-200'
            onValueChange={(e) => tabsChanged(e.value)}
        >
            <Tabs.List
                className='
                    flex
                    border-t-2
                    mb-[3px]
                    shadow-[0_3px_3px_rgba(0,0,0,0.2)]
                    bg-white
                    z-[var(--chakra-zIndices-docked)]'
            >
                <Tabs.Trigger
                    value="likes"
                    colorPalette="main"
                    css={{ "--indicator-color": "var(--color-main)" }}
                    className='
                        flex-1
                        py-7
                        text-lg
                        text-center
                        justify-center
                        items-center
                        bg-white'
                >
                    いいね順
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="newest"
                    colorPalette="main"
                    css={{ "--indicator-color": "var(--color-main)" }}
                    className='
                        flex-1
                        py-7
                        text-lg
                        text-center
                        justify-center
                        items-center
                        bg-white'
                >
                    投稿順
                </Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
        {/* <Box className='flex flex-col h-screen'> */}
        <Box
            className='
                flex-1
                overflow-y-auto
                px-4
                pt-4'
        >
            <VStack className='gap-4 flex items-stretch'>
{/* TODO postsが0の場合と取得が許されない場合に表示を切り替えられるようにする。 */}
                {posts.map((post, i) => (
                    <Box
                        key={i}
                        className='
                            w-full
                            p-4
                            bg-white
                            border-b
                            border-gray-200
                            last:border-b-0'
                    >
                        <div className='relative flex items-start'>
                            <Box className='flex-1 pr-4'>
                                <Text className='text-base mb-2'>
                                    {post.content}
                                </Text>
                                <Text className='text-sm text-gray-500'>
                                    {post.postedTime}
                                </Text>
                            </Box>
                            <div
                                className='
                                    flex
                                    flex-col
                                    items-center
                                    mr-2'
                            >
{/* TODO クリックをすることで、いいねの状態を切り替えるようにバックエンド側に送信する。 */}
{/* TODO クリックをすることで、いいねの状態によって見た目を切り替えるようにする */}
                                <Button
                                    className='
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
                                        mr-1'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-3/5 h-auto ml-[5%] mb-[5%]' viewBox="0 0 25.2 20.913">
                                        <path id="thumb_up_24dp_000_FILL0_wght400_GRAD0_opsz24" d="M99.2-899.087H86V-912.68L94.4-920l1.5,1.307a1.356,1.356,0,0,1,.345.5,1.52,1.52,0,0,1,.135.6v.366l-1.32,4.549h7.74a2.478,2.478,0,0,1,1.68.627,1.892,1.892,0,0,1,.72,1.464v2.091a1.426,1.426,0,0,1-.06.392q-.06.209-.12.392l-3.6,7.372a2.232,2.232,0,0,1-.9.889A2.59,2.59,0,0,1,99.2-899.087Zm-10.8-2.091H99.2l3.6-7.32v-2.091H92l1.62-5.751-5.22,4.549Zm0-10.613v0ZM86-912.68v2.091H82.4v9.411H86v2.091H80V-912.68Z" transform="translate(-80 920)" fill="#2a2a2a"/>
                                    </svg>
                                </Button>
                                <Text className='text-sm font-bold'>
                                    {post.goodCount}
                                </Text>
                            </div>
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <Button className="absolute -right-4 -top-4 bg-white rounded-full aspect-square">
                                        <FaEllipsisV className='w-9/10 h-9/10 text-[#2A2A2A]' />
                                    </Button>
                                </Menu.Trigger>
                                <Portal>
                                    <Menu.Positioner>
                                    <Menu.Content>
{/* TODO クリックをすることで、"localhost:pointID/postID"を返すようにする */}
                                        <Menu.Item value="share">共有リンクを発行</Menu.Item>
                                        <Menu.Item
                                        value="report"
                                        color="fg.error"
                                        _hover={{ bg: "bg.error", color: "fg.error" }}
                                        >
                                        報告する
                                        </Menu.Item>
{/* TODO "削除する"が押された際に投稿を消すようにバックエンド側に流した後に更新する */}
                                        <Menu.Item
                                        value="delete"
                                        color="fg.error"
                                        _hover={{ bg: "bg.error", color: "fg.error" }}
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
                    <Text className='text-lg text-gray-500'>
                        コンテンツの終わりです。
                    </Text>
                </div>
            </VStack>
        </Box>
    </>
    )
}

export default PostList

function GetPostsApiResponseReturnFiv(): any {
    throw new Error('Function not implemented.');
}
