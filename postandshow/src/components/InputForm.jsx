import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import REACT_GIPHY_KEY from "../giphyKey"
import axios from "axios"

const InputForm = ({text,url,setText,setUrl,handleChange}) => {


    
    const [toggle,setToggle]=useState(false)
    const [search,setSearch]=useState("")
    const [result,setResult]=useState([])

    useEffect(()=>{
        async function getTrending(){
            const result= await axios(`https://api.giphy.com/v1/gifs/trending?api_key=${REACT_GIPHY_KEY}&limit=25&rating=g`);
            const {data}=result;
            setResult(data.data)
        }
        async function getSearch(){
            const result= await axios(`https://api.giphy.com/v1/gifs/search?api_key=${REACT_GIPHY_KEY}&q=${search}&limit=25&offset=0&rating=g&lang=en`);
            const {data}=result;
            // console.log(result)
            setResult(data.data)
        }
       if(!search){
     getTrending();
       }else{
        
           getSearch();
       }
    },[search])



    return (  <>

        

        <div className='card'>
            <div className='d-flex flex-row m-2'>
            <img src='https://i.stack.imgur.com/l60Hf.png' alt="default_dp" className='thumbnail'></img>
            <input type="text" className="form-control" onChange={(e)=>setText(e.currentTarget.value)} placeholder="What's on your mind" value={text} />
            
              </div>
              {url&&(<img src={url} alt="post Url" className="post-url"></img>)}

              <div className='d-flex justify-content-between m-2'>

              <button type="button" className="button" onClick={()=>{
                  setSearch("")
                  setToggle(!toggle)}}>Gif</button>
              <button type="button" className="button" onClick={()=>{
                  setToggle(false)
                  setSearch("")
                  handleChange()}}>Post</button>
              </div>
                       
        </div>
        {toggle&& (
            <>
            <div className='card gif-card container'>
            <input type="text" value={search} onChange={(e)=>{
                setSearch(e.currentTarget.value)
             
            }} className="form-control" placeholder="Search" />

            <div>
            <div className='row'>
            {result?(
                <>
                {result.map((item,i)=>{
                   
                     
                     return (<>
                     <div className='col-3' key={i}>
                     <div onClick={()=>setUrl(item.images.downsized_medium.url)}>
  <img src={item.images.downsized_medium.url} className="card-img-top" alt="..."/>
</div>

                     </div>

                     </>)
                })}
                </>
            ):(<>Loading...</>)}
            </div>
            </div>
            
            </div>
            </>

        )}

    </>);
}
 
export default InputForm;