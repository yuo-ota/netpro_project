import InternalServerError from '@/app/routes/InternalServerError';
import NotFound from '@/app/routes/NotFound';
import Post from '@/app/routes/Post';
import Root from '@/app/routes/Root';
import Unauthorized from '@/app/routes/Unathorized';
import UnexpectedError from '@/app/routes/UnexpectedError';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                {/* ホーム画面 */}
                <Route path="/" element={<Root />} />
                {/* 投稿画面 */}
                <Route path="/post" element={<Post />} />
                {/* Unauthorized画面 */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* InternalServerError画面 */}
                <Route path="/internal-server-error" element={<InternalServerError />} />
                {/* UnexpectedError画面 */}
                <Route path="/unexpected-error" element={<UnexpectedError />} />
                {/* NotFound画面 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
