import React, { useState, useEffect} from 'react'
import axios from 'axios'


const SearchForm = ({ history }) => {

  const [keyword, setKeyword] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);

console.log(suggestions);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/v1/allproducts',
    }).then(res => {
      setData(prevPosts => {
        return [...res.data.products.map(product => product.name)]
      })
      
    }).catch(e => {
      console.log(e)
    })
  }, [keyword]);

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
        history.push(`/search/${keyword}`)
    } else {
        history.push('/')
    }
  }

  function handleKeyDown(e) {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setKeyword(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  }

  function handleChange(e) {
    const query = e.target.value.toLowerCase();
    setKeyword(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  }

  const handleClick = (e) => {
    setSuggestions([]);
    setKeyword(e.target.innerText);
    setSuggestionsActive(false);
  };
  function showSearchBoxAct() {
    setShowSearchBox(true);
  }
  function hideSearchBox() {
    setShowSearchBox(false);
  }


  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };
    return (
      <div className="search-bar">
        <div className="hdr_cell">
            <a onClick={showSearchBoxAct} className="search_btn"> <img src="/images/search.png" alt="" /></a>
          </div>
          {showSearchBox && (
            <div className="search_box" style={{marginRight: '100%'}}>
              <div onClick={hideSearchBox} className="close_btn" style={{display: 'block'}}><img src="/images/cross.png" /></div>
                <form onSubmit={searchHandler}>
                  <input id="search" 
                    name="search" 
                    type="text" 
                    placeholder="search..." 
                    value={keyword} 
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}/>
                    {suggestionsActive && <Suggestions />}
                  <input id="search_submit" value="" type="submit" />
                </form>
            </div>
          )}
          
      </div>
        
    )
}

export default SearchForm
