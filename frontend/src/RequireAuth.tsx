import type { JSX } from "react";
import './App.css'

function RequireAuth({ children }: { children: JSX.Element }) {
    // TODO ここに認証ロジック
    
    return children;
}

export default RequireAuth