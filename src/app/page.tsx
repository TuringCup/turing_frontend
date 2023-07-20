'use client'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { Login } from './login';

export default function Home() {
  const [content, setcontent] = useState(0);
  return (
    <main>
      <div>NavBar</div>
      <Content content={content} setContent={setcontent}></Content>
      
    </main>
  )
}

function Content(props:{content:number, setContent:Dispatch<SetStateAction<number>>}) {
  let content = props.content;
  let setContent = props.setContent;
  switch(content) {
    case 1:
      return (
        <div>
          Intro Content
          <br></br>
          <button onClick={() => {setContent(content+1)}}>Change Content</button>
        </div>
      );
      break;
    case 2:
      return (
        <div>
          <Login></Login>
          <br></br>
          <button onClick={() => {setContent(content+1)}}>Change Content</button>
        </div>
      );
      break;
    default:
      return (
        <div>
          Intro Content
          <br></br>
          <button onClick={() => {setContent(content+1)}}>Change Content</button>
        </div>
      )
      break;
  }
}
