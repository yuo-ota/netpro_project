import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import closeIcon from '../assets/close_icon.svg';

type PostButtonContainerProps = {
    onClickPost: () => void;
    onClickBack: () => void;
};

const PostButtonContainer: React.FC<PostButtonContainerProps> = ({ onClickPost, onClickBack }) => {
    return (
        <div className="flex-none flex justify-around items-center w-full h-[75px] bg-white shadow-md z-20">
            <Button
                className="flex items-center h-2/3 max-w-1/2 bg-white gap-0 transition duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-200"
                onClick={onClickBack}
            >
                <img src={closeIcon} alt="投稿画面終了アイコン" className="h-2/3 w-auto" />
                <Text className="text-xl pr-1 text-black">キャンセル</Text>
            </Button>
            <Button
                className="
                    flex
                    items-center
                    justify-center
                    max-w-1/2
                    w-[128px]
                    h-2/3
                    bg-white
                    text-black
                    rounded-full
                    border-2
                    border-main
                    shadow-lg
                    shadow-main/20
                    transition
                    duration-200
                    ease-in-out
                    hover:shadow-sm
                    active:text-white
                    active:bg-main"
                onClick={onClickPost}
            >
                <Text className="text-xl">投稿する</Text>
            </Button>
        </div>
    );
};

export default PostButtonContainer;
