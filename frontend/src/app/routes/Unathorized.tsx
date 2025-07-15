import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // ホームに戻るリンクを付ける場合

const Unauthorized: React.FC = () => {
    return (
        <>
            <div className="flex justify-center items-center h-dvh w-dvw">
                <VStack>
                    <h1>401 - 認証に失敗しました。</h1>
                    <p>ホームに遷移後に再リロードをかけることで</p>
                    <p>ユーザーIDが初期化します。</p>
                    <p>
                        この際に、これまで投稿していた内容については削除ができなくなる可能性があります。
                    </p>
                    <p>万一不都合がありましたら、開発者に連絡をお願いします。</p>
                    <p>X: @yuo_ota</p>
                    <Link
                        to="/"
                        onClick={() => {
                            localStorage.removeItem('userId');
                        }}
                    >
                        ホームに戻る
                    </Link>
                </VStack>
            </div>
        </>
    );
};

export default Unauthorized;
