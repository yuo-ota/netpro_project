import { useEffect, useState } from 'react';
import ErrorDialog from '@/components/ErrorDialog';
import { useAuth } from '@/components/AuthProvider';
import { Root as FeatureRoot } from '@/feature/Root/Root';

const Root = () => {
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);
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
            <FeatureRoot
                setIsOpenErrorDialog={setIsOpenErrorDialog}
                setErrorTitle={setErrorTitle}
                setErrorDetail={setErrorDetail}
            />
        </>
    );
};

export default Root;
