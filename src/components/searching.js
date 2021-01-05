import React, { useState} from 'react';
import { Input } from 'antd';
import { Link } from 'gatsby';
import { formatDate} from '../pages/index';

const { Search } = Input;

const onSearch = value => console.log('search: ',value);

const Searching = (data) => {
    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    });

    const handleInputChange = (event) => {
      console.log('search data: ', data);
      const query = event.target.value;
      const posts = data.data.allMarkdownRemark.nodes || [];
      console.log('posts: ', posts);
      
      const filteredData = posts.filter((post) => {
          const { description, title } = post.frontmatter;
          return (
            (description && description.toLowerCase().includes(query.toLowerCase())) ||
            (title && title.toLowerCase().includes(query.toLowerCase()))
          );
        });

      setState({
        query,
        filteredData,
      });
    };

    const renderSearchResults = () => {
      const { query, filteredData } = state;
      const hasSearchResults = filteredData && query !== emptyQuery;
      const posts = hasSearchResults ? filteredData : [];
      return (
        posts && posts.map((node) => {
          const { excerpt } = node;
          const { slug } = node.fields;
          const { title, date, description } = node.frontmatter;
          return (
            <div key={slug} className="search-reasult" style={{width: '480px', }}>
              <article key={slug}>
                <header>
                  <h2 style={{display: 'inline'}}>
                    <Link to={slug}>{title}</Link>
                  </h2>
                <Link to={slug}>
                  <small style={{display: 'inline', color: '#000000'}}>
                      {formatDate(date)}
                  </small>
                </Link>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description || excerpt,
                    }}
                  />
                </section>
              </article>
            </div>
          );
        })
      );
    };

    return (
      <div style={{ display: 'block'}}>
        <Search
        placeholder="단어를 입력하세요."
        allowClear
        enterButton="검색"
        size="large"
        onSearch={onSearch}
        onChange={handleInputChange}
        
        style={{ width: '500px', margin: '10px 10px 0' }}
      />
      {state.query && (
        <div style={{display: 'block'}}>
          {renderSearchResults()}
        </div>
      )}
      </div>
    )
}

export default Searching;