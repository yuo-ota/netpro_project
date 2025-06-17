import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react"

function PostList() {
    return (
        <>
            <VStack spaceY={4} align="stretch">
                {[...Array(20)].map((_, i) => (
                    <>
                        <div className="flex w-full h-[200px] relative">
                            <div className="flex items-center flex-1 w-65/100 h-full bg-red-300">
                                <VStack className="ml-[30px]">
                                    <Text>{`${i}番目の要素です。`}</Text>
                                    <Text>2025/6/12 2:52</Text>
                                </VStack>
                            </div>
                            <VStack className="flex justify-center items-center flex-none w-1/4 h-full bg-blue-300">
                                <div className="w-[100px] h-[100px] mt-[15px] bg-green-200 rounded-full"></div>
                                <Text>999</Text>
                            </VStack>
                            <div className="absolute w-[30px] h-[30px] top-[10px] right-[10px] bg-cyan-200 rounded-full" />
                        </div>
                    </>
                ))}
                <Text fontSize="sm" color="gray.500">
                    コンテンツの終わりです。
                </Text>
            </VStack>
        </>
    )
}

export default PostList