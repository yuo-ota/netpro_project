import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // ホームに戻るリンクを付ける場合

const NotFound: React.FC = () => {
    return (
        <>
            <div className='flex justify-center items-center h-dvh w-dvw'>
                <VStack>
                    {/* TODO できたらCSSを作る */}
                    <h1>404 - ページが見つかりません</h1>
                    <p>お探しのページは存在しないか、移動された可能性があります。</p>
                    <Link to="/">ホームに戻る</Link>
                </VStack>
            </div>
        </>
    );
};

export default NotFound;