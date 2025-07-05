import './App.css';
import Root from './Root';
import Post from './Post';
import NotFound from './NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GpsProvider } from './GpsContext';
import Unauthorized from './Unathorized';
import InternalServerError from './InternalServerError';
import UnexpectedError from './UnexpectedError';
import { AuthProvider } from './AuthProvider';

function App() {
    return (
        <>
            <GpsProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            {/* ホーム画面 */}
                            <Route path="/" element={<Root />} />
                            {/* 投稿画面 */}
                            <Route path="/post" element={<Post />} />
                            {/* Unauthorized画面 */}
                            <Route path="/unauthorized" element={<Unauthorized />} />
                            {/* InternalServerError画面 */}
                            <Route
                                path="/internal-server-error"
                                element={<InternalServerError />}
                            />
                            {/* UnexpectedError画面 */}
                            <Route path="/unexpected-error" element={<UnexpectedError />} />
                            {/* NotFound画面 */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </GpsProvider>
        </>
    );
}

export default App;
