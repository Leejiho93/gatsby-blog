import 'antd/dist/antd.css';
import { GithubOutlined } from '@ant-design/icons'
import React from "react"
import { Link } from "gatsby"
import Search  from './searching'
import { pageQuery } from '../pages/index';

const Layout = ({ location, title, search, posts, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
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
      <header className="global-header">
        {header}
        {search ? <Search data={posts}/> : null}
        <a rel="noreferrer" target="_blank" href="https://github.com/Leejiho93">
          <GithubOutlined style={{ fontSize: '35px', color: '#000000'}}/>
        </a>
      </header>
      <main className="global-main">{children}</main>
      <footer>
        {/* © {new Date().getFullYear()} {` `} */}
        ©
        <a href="https://www.gatsbyjs.com">easyho</a>
      </footer>
    </div>
  )
}

export default Layout
