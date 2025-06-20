import { Box, Tabs, Text, VStack, Flex, Button} from '@chakra-ui/react';
import { FaRegThumbsUp, FaEllipsisV } from 'react-icons/fa';

function PostList() {
    return (
    <>
        <Tabs.Root defaultValue={"likes"} className='w-full sticky top-0 z-200'>
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
                        <div className='relative flex items-start'>
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
                            <div
                                className='
                                    flex
                                    flex-col
                                    items-center
                                    mr-2'
                            >
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
                                    999
                                </Text>
                            </div>
                            
                            <Button className="absolute -right-4 -top-4 bg-white rounded-full aspect-square">
                                <FaEllipsisV className='w-full h-full text-[#2A2A2A]' />
                            </Button>
                        </div>
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