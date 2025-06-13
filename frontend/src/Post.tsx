import { useState } from 'react';
import './App.css'
import PostButtonContainer from './PostButtonContainer'
import PostForm from './PostForm'

function Post() {
    const [postText, setPostText] = useState('');
    
    return (
        <div className="relative flex flex-col w-dvw h-dvh">
            <PostButtonContainer />
            <PostForm postText={postText} setPostText={setPostText} />
        </div>
    )
}

export default Post