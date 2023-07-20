'use client'
import { useState } from 'react'
import { Content } from './content';
import { NavBar } from './navbar';

export default function Home() {
  const [content, setcontent] = useState(0);
  return (
    <main>
      <NavBar setContent={setcontent}></NavBar>
      <Content content={content} setContent={setcontent}></Content>
    </main>
  )
}


