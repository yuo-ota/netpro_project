import './App.css'
import Root from './Root'
import Post from './Post';
import NotFound from './NotFound'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GpsProvider } from './GpsContext';

function App() {
    return (
        <>
            <GpsProvider>
                <BrowserRouter>
                    <Routes>
                        {/* TODO Rootコンポーネント > Postコンポーネント > RequireAuthコンポーネントの順で作成する。 */}
                        {/* ホーム画面 */}
                        <Route path="/" element={
                            // <RequireAuth> // TODO 今後作る
                                <Root />
                            // </RequireAuth>
                        } />
                        {/* 投稿画面 */}
                        <Route path="/post" element={
                            // <RequireAuth> // TODO 今後作る
                                <Post />
                            // </RequireAuth>
                        } />
                        {/* NotFound画面 */}
                        <Route path="*" element={
                            <NotFound />
                        } />
                    </Routes>
                </BrowserRouter>
            </GpsProvider>
        </>
    )
}

export default App
