import React, {useEffect, useState} from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../pages/index';

const Search = (data) => {
    const emptyQuery = "";
    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    });

    const handleInputChange = (event) => {
        const query = event.target.value;
        const posts = data.data.allMarkdownRemark.nodes || [];
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
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (
                <strong>
                    <li key={slug}>
                        <Link to={slug} style={{ color: '#000000'}}>{title}</Link>
                    </li>
                </strong>
            );
          })
        );
      };

    return (
        <div className="search-wrapper">    
            <div className="search-input">
                <input 
                    type="text"
                    placeholder="search"
                    onChange={handleInputChange}/>
                <div className="autocom-box">
                    {renderSearchResults()} 
                </div>   
                <div className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div> 
            </div>
        </div>
    )
}

export default Search;