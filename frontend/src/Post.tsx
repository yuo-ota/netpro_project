import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import PostButtonContainer from './PostButtonContainer'
import PostForm from './PostForm'
import { useGps } from './GpsContext';
import ErrorDialog from './ErrorDialog';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

function Post() {
    const [postText, setPostText] = useState<string>('');
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleGoToRoot = () => {
        navigate('/');
    };

    const handleSendPost = async () => {
        // ポストの内容が150字を超えている/何も書かれてない場合をはじく
        if (postText.length > 150 || postText.trim().length === 0)
            return;

        // バックエンド側に送信する
        const userId = localStorage.getItem('userId');
        const { lat, lng, error } = useGps();

        if (error) {
            setIsOpenErrorDialog(true);
            return;
        }
        try {
            const response = await fetch(`${API_ORIGIN}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    latitude: lat,
                    longitude: lng,
                    content: postText
                }),
            });

            // ステータスコードで判定
            if (response.status === 201) {
                const data = await response.json();
                console.log('投稿成功:', data);
                setPostText(''); // 入力クリア
                handleGoToRoot();
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                console.error('サーバーエラー');
            } else {
                setIsOpenErrorDialog(true);
                throw new Error(`想定外のステータスコード: ${response.status}`);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            console.error('エラー:', error);
        }
    };
    
    return (
        <>
            <ErrorDialog isOpen={isOpenErrorDialog} setIsOpen={setIsOpenErrorDialog} />
            <div className="relative flex flex-col w-dvw h-dvh">
                <PostButtonContainer onClickPost={handleSendPost} onClickBack={handleGoToRoot} />
                <PostForm postText={postText} setPostText={setPostText} />
            </div>
        </>
    )
}

export default Post