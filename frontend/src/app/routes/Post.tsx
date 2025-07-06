import { useEffect, useState } from 'react';
import ErrorDialog from '@/components/ErrorDialog';
import { useAuth } from '@/components/AuthProvider';
import { Post as FeaturePost } from '@/feature/Post/Post';

function Post() {
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<string>('');
    const [errorDetail, setErrorDetail] = useState<string[]>([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) {
            setIsOpenErrorDialog(true);
            setErrorTitle('認証エラーが発生しました。');
            setErrorDetail([`ユーザーIDが不正な疑いがあります。`, `ページを更新してください。`]);
            return;
        }
    }, [userId]);

    return (
        <>
            <ErrorDialog
                isOpen={isOpenErrorDialog}
                setIsOpen={setIsOpenErrorDialog}
                errorTitle={errorTitle}
                errorDetail={errorDetail}
            />
            <FeaturePost
                setIsOpenErrorDialog={setIsOpenErrorDialog}
                setErrorTitle={setErrorTitle}
                setErrorDetail={setErrorDetail}
            />
        </>
    );
}

export default Post;
