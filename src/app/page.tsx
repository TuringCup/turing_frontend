'use client'
import { useState } from 'react'
import { Content } from './content';
import { NavBar } from './navbar';

// main page
export default function Home() {
  // 通过content值的设定显示特点的内容
  const [content, setcontent] = useState(0);
  return (
    <main>
      {/* 页面顶部的导航栏 */}
      <NavBar setContent={setcontent}></NavBar>

      {/* 根据content的值显示不同的内容 */}
      <Content content={content} setContent={setcontent}></Content>
    </main>
  )
}


