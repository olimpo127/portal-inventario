import React from 'react';
import "./Home.css";
import Post from '../components/Post';

function Home() {
  return (
    <div className='home'>
      This is the Home
      <Post />
    </div>
  )
}

export default Home;
