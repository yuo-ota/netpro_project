import { Textarea, Text } from '@chakra-ui/react';

type PostFormContainerProps = {
    postText: string;
    setPostText: (value: string) => void;
};

function PostForm({ postText, setPostText }: PostFormContainerProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value);
    };

    return (
        <>
            <div className="flex flex-1 justify-center items-center w-full bg-white">
                <div className="flex flex-col max-w-[800px] h-8/10 w-8/10 justify-center items-center">
                    <Textarea
                        resize="none"
                        placeholder="ここに投稿内容を入力"
                        className="
                            flex-1
                            w-full
                            text-2xl
                            border-0
                            rounded-1
                            caret-main
                            focus-visible:outline-none"
                        onChange={handleChange}
                    />
                    <div className="flex justify-end  items-end w-full">
                        <Text
                            className={`text-xl mt-[5px] mr-[5px] ${
                                postText.length > 150 ? 'text-red-500' : 'text-gray-700'
                            }`}
                        >
                            {`${postText.length}/150文字`}
                        </Text>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostForm;
