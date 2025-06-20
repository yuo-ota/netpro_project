import { Box, Tabs, Text, VStack, Flex} from '@chakra-ui/react';
import { FaRegThumbsUp, FaEllipsisV } from 'react-icons/fa';

function PostList() {
    return (
    <>
        <Tabs.Root defaultValue={"likes"} className='w-full sticky top-0'>
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
                    _selected={{
                    // borderBottom: '3px solid green',
                    // color: 'black',
                    }}
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
                    _selected={{
                    // borderBottom: '3px solid green',
                    // color: 'black',
                    }}
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
                {[...Array(20)].map((_, i) => (
                    <Box
                        key={i}
                        className='
                            p-4
                            bg-white
                            border-b
                            border-gray-200
                            last:border-b-0'
                    >
                        <Flex className='flex items-start'>
                            <Box className='flex-1 pr-4'>
                                <Text className='text-base mb-2'>
                                    高瀬舟は京都の高瀬川を上下する小舟である。
                                    徳川時代に京都の罪人が遠島を申し渡されると、本人の親類が牢屋敷へ呼び出されて、そこで暇乞いをすることを許された。
                                    それから罪人は高瀬舟に載せられて、大阪へ回されることであった。
                                </Text>
                                <Text className='text-sm text-gray-500'>
                                    2025/06/20 11:24
                                </Text>
                            </Box>
                            <Flex
                                className='
                                    flex
                                    flex-col
                                    items-center
                                    mr-2'
                            >
                                <Box
                                    className='
                                        w-[12vh]
                                        h-[12vh]
                                        rounded-full
                                        bg-white
                                        border
                                        border-gray-500
                                        shadow-[0px_1px_3px_rgba(0, 0, 0, 0.1)]
                                        flex
                                        items-center
                                        justify-center
                                        mb-1'
                                >
                                    <FaRegThumbsUp className='text-[5vh] text-gray-500' />
                                </Box>
                                <Text className='text-sm font-bold'>
                                    999
                                </Text>
                            </Flex>
                            
                            <Box>
                                <FaEllipsisV className='text-lg text-gray-500' />
                            </Box>
                        </Flex>
                    </Box>
                ))}
                <Text className='text-sm text-gray-500'>
                        コンテンツの終わりです。
                </Text>
            </VStack>
        </Box>
    </>
    )
}

export default PostList