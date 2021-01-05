import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons'
import React from "react"
import { Link } from "gatsby"
import Search  from './searching'
import { pageQuery } from '../pages/index';
import Nav from './Nav';

const Layout = ({ location, title, posts, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  console.log('layout title: ', title)
  console.log('layout posts: ', posts)
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header" style={{height: '80px', backgroundColor: 'white', position: 'sticky', top: '0', backdropFilter: 'blur(2px)'}}>
        {header}
        <Search data={posts}/>
        {/* <Nav isRootPath={isRootPath} title={title}/> */}
      </header>
      <main className="global-main">{children}</main>
      <footer>
        © <a href="https://www.gatsbyjs.com">easyho</a>
      </footer>
    </div>
  )
}

export default Layout
