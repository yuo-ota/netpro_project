import { Box, Tabs, Text, VStack, Flex, Icon } from '@chakra-ui/react';
import { FaRegThumbsUp, FaEllipsisV } from 'react-icons/fa';

function PostList() {
    return (
    <Box height="100vh" display="flex" flexDirection="column">
        <Tabs.Root defaultValue={"likes"} width="100%">
            <Tabs.List display="flex"
                borderBottom="none"
                borderTop="2px solid black"
                marginBottom="3px"
                boxShadow="0 3px 3px rgba(0,0,0,0.2)"
                bg="white"
                zIndex="docked"
                width="100%"
            >
                <Tabs.Trigger
                    value="likes"
                    flex="1"
                    py={7}
                    fontSize="lg"
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    bg="white"
                    _selected={{
                    borderBottom: '3px solid green',
                    color: 'black',
                    }}
                >
                    いいね順
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="newest"
                    flex="1"
                    py={7}
                    fontSize="lg"
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    bg="white"
                    _selected={{
                    borderBottom: '3px solid green',
                    color: 'black',
                    }}
                >
                    投稿順
                </Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>

        <Box flex="1" overflowY="auto" px={4} pt={4}>
            <VStack gap={4} align="stretch">
                {[...Array(20)].map((_, i) => (
                    <Box
                        key={i}
                        p={4}
                        bg="white"
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        _last={{ borderBottom: "none" }}
                    >
                        <Flex align="flex-start">
                            <Box flex="1" pr={4}>
                                <Text fontSize="md" mb={2}>
                                    高瀬舟は京都の高瀬川を上下する小舟である。
                                    徳川時代に京都の罪人が遠島を申し渡されると、本人の親類が牢屋敷へ呼び出されて、そこで暇乞いをすることを許された。
                                    それから罪人は高瀬舟に載せられて、大阪へ回されることであった。
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    2025/06/20 11:24
                                </Text>
                            </Box>

                            <Flex direction="column" alignItems="center" mr={2}>
                                <Box
                                    w="12vh"
                                    h="12vh"
                                    borderRadius="full"
                                    bg="white"
                                    border="1px solid gray.500"
                                    boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    mb={1}
                                >
                                    <Icon as={FaRegThumbsUp} color="gray.500" boxSize={10} />
                                </Box>
                                <Text fontSize="sm" fontWeight="bold">
                                    999
                                </Text>
                            </Flex>

                            <Box>
                                <Icon as={FaEllipsisV} color="gray.500" boxSize={5} />
                            </Box>
                        </Flex>
                    </Box>
                ))}
                <Text fontSize="sm" color="gray.500">
                        コンテンツの終わりです。
                </Text>
            </VStack>
        </Box>
    </Box>
    )
}

export default PostList