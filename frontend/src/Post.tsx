import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import PostButtonContainer from './PostButtonContainer';
import PostForm from './PostForm';
import { useGps } from './GpsContext';
import ErrorDialog from './ErrorDialog';
import { useAuth } from './AuthProvider';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

function Post() {
    const [postText, setPostText] = useState<string>('');
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<string>('');
    const [errorDetail, setErrorDetail] = useState<string[]>([]);
    const { userId } = useAuth();
    const { lat, lng, error } = useGps();
    const navigate = useNavigate();

    const handleGoToRoot = () => {
        navigate('/');
    };

    useEffect(() => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
        }
    }, [userId]);

    const handleSendPost = async () => {
        // ポストの内容が150字を超えている/何も書かれてない場合をはじく
        if (postText.length > 150 || postText.trim().length === 0) return;

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
                    content: postText,
                }),
            });

            // ステータスコードで判定
            if (response.status === 201) {
                const data = await response.json();
                console.log('投稿成功:', data);
                setPostText(''); // 入力クリア
                handleGoToRoot();
            } else if (response.status === 401) {
                setIsOpenErrorDialog(true);
                setErrorTitle('認証エラーが発生しました。');
                setErrorDetail([
                    `ユーザーIDが不正な疑いがあります。`,
                    `ページを更新してください。`,
                ]);
            } else if (response.status === 500) {
                setIsOpenErrorDialog(true);
                setErrorTitle('サーバーエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            } else {
                setIsOpenErrorDialog(true);
                setErrorTitle('想定外のエラーが発生しました。');
                setErrorDetail([
                    `時間を開けて再度お試しください。`,
                    `エラーが解消しない場合にはサポートに連絡してください。`,
                ]);
            }
        } catch (error) {
            setIsOpenErrorDialog(true);
            setErrorTitle('想定外のエラーが発生しました。');
            setErrorDetail([
                `時間を開けて再度お試しください。`,
                `エラーが解消しない場合にはサポートに連絡してください。`,
            ]);
        }
    };

    return (
        <>
            <ErrorDialog
                isOpen={isOpenErrorDialog}
                setIsOpen={setIsOpenErrorDialog}
                errorTitle={errorTitle}
                errorDetail={errorDetail}
            />
            <div className="relative flex flex-col w-dvw h-dvh">
                <PostButtonContainer onClickPost={handleSendPost} onClickBack={handleGoToRoot} />
                <PostForm postText={postText} setPostText={setPostText} />
            </div>
        </>
    );
}

export default Post;
