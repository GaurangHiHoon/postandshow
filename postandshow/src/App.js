import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './components/InputForm';
import "./sass/styles.scss"
import { useState } from 'react';

function App() {

  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");
  const [url,setUrl]=useState("");
  // console.log(text);
  
  const handleChange=()=>{
    const postData=[...posts];
    const data={"text":text,"url":url};
    // console.log(data)
    postData.push(data);
    setPosts(postData);
    setText("");
    setUrl("");
  }

  return (
    <div className="app">
<InputForm
text={text}
setText={setText}
url={url}
setUrl={setUrl}
handleChange={handleChange}
/>
<div className='posts' >
  {posts&&(
    <>
    {posts.map((item,i)=>(
      <div className='post' key={i}>
        <p className='lead'><em>{item.text}</em></p>
        <img src={item.url} alt={`images ${i}`} className="post-image"/>
      </div>
    ))}
    </>
  )}
</div>
    </div>
  );
}

export default App;
