import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // ホームに戻るリンクを付ける場合

const UnexpectedError: React.FC = () => {
    return (
        <>
            <div className="flex justify-center items-center h-dvh w-dvw">
                <VStack>
                    <h1>予期せぬエラーが発生しました。</h1>
                    <p>時間を開けて再度お試しください。</p>
                    <p>また問題が解決しない場合には、開発者に連絡をお願いします。</p>
                    <p>X: @yuo_ota</p>
                    <Link to="/">ホームに戻る</Link>
                </VStack>
            </div>
        </>
    );
};

export default UnexpectedError;
