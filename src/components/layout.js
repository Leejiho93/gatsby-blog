import 'antd/dist/antd.css';
import React from "react";
import { Link } from "gatsby";
import Search from './search';

const Layout = ({ location, title, posts, search, children }) => {
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
    <div className="global-wrapper" data-is-root-path={isRootPath} >
      <header className="global-header" style={{ position: 'sticky', top: '0'}}>
        {header}
        {search ? <Search data={posts}/> : null}
      </header>
      <main className="global-main">{children}</main>
      
      <footer>
        © <a target="_blank" href="https://github.com/Leejiho93">easyho</a>
      </footer>
    </div>
  )
}

export default Layout
