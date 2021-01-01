import React, { useState} from 'react';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

const Searching = () => {
    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
      });
    
      const handleInputChange = (event) => {
        const query = event.target.value;
        setState({
          query,
          filteredData,
        });
      };

    return (
        <Search
        placeholder="단어를 입력하세요."
        allowClear
        enterButton="검색"
        size="large"
        onSearch={onSearch}
        onChange={handleInputChange}
        
        style={{ width: '500px', margin: '10px 10px 0' }}
      />
    )
}

export default Searching;