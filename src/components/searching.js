import React, { useState} from 'react';
import { Input } from 'antd';
import { Link } from 'gatsby';

const { Search } = Input;

const onSearch = value => console.log('search: ',value);

const Searching = (data) => {
    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    });

    const handleInputChange = (event) => {
      console.log('data: ', data);
      const query = event.target.value;
      const posts =  data.data.allMarkdownRemark.nodes || [];
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
            <div key={slug}>
              <article key={slug}>
                <header>
                  <h2>
                    <Link to={slug}>{title}</Link>
                  </h2>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description || excerpt,
                    }}
                  />
                  <p>
                    <em>{date}</em>
                  </p>
                </section>
              </article>
            </div>
          );
        })
      );
    };

    // const renderSearchResults = () => {
    //   const { query, filteredData } = state;
    //   const hasSearchResults = filteredData && query !== emptyQuery;
    //   const posts = hasSearchResults ? filteredData : [];
    //   return (
    //     posts && posts.map((node) => {
    //       const { excerpt } = node;
    //       const { slug } = node.fields;
    //       const { title, date, description } = node.frontmatter;
    //     })
    //   );
    // };

    return (
      <>
        <Search
        placeholder="단어를 입력하세요."
        allowClear
        enterButton="검색"
        size="large"
        onSearch={onSearch}
        onChange={handleInputChange}
        
        style={{ maxWidth: '500px', margin: '10px 10px 0' }}
      />
      {state.query && (
        <div>
          {renderSearchResults()}
        </div>
      )}
      </>
    )
}

export default Searching;