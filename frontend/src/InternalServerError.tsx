import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // ホームに戻るリンクを付ける場合

const InternalServerError: React.FC = () => {
    return (
        <>
            <div className='flex justify-center items-center h-dvh w-dvw'>
                <VStack>
                    <h1>500 - サーバーでエラーが発生しました。</h1>
                    <p>時間を開けて再度お試しください。</p>
                    <p>また問題が解決しない場合には、サポートにお問い合わせください。</p>
                    <p>hoge@example.com</p>
                    <Link to="/">ホームに戻る</Link>
                </VStack>
            </div>
        </>
    );
};

export default InternalServerError;