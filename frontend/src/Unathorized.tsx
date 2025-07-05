import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // ホームに戻るリンクを付ける場合

const Unauthorized: React.FC = () => {
    return (
        <>
            <div className="flex justify-center items-center h-dvh w-dvw">
                <VStack>
                    <h1>401 - 認証に失敗しました。</h1>
                    <p>ユーザーIDが初期化されます。</p>
                    <p>
                        この際に、これまで投稿していた内容については削除ができなくなる可能性があります。
                    </p>
                    <p>万一不都合がありましたら、サポートにお問い合わせください。</p>
                    <p>hoge@example.com</p>
                    <Link to="/">ホームに戻る</Link>
                </VStack>
            </div>
        </>
    );
};

export default Unauthorized;
