import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Root from './Root'
import NotFound from './NotFound'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
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
                        <></> // TODO Postコンポーネントが作れたら消す
                        // <RequireAuth> // TODO 今後作る
                        //     <Post />
                        // </RequireAuth>
                    } />
                    {/* NotFound画面 */}
                    <Route path="*" element={
                        <NotFound />
                    } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
