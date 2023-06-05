import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { List } from './components/list/list'
import { SearchBar } from './components/search-bar/search-bar'
import { debounce } from 'lodash';
import { Detail } from './components/detail/detail';

function App() {
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [gifs, setGifs] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (query) {
      fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=jOPMdqZ0WoT2whk7HjnLANXBFa5xblms&limit=10&offset=${offset}`)
      .then((result) => result.json())
      .then((gifsResult) => {
        setGifs(gifsResult.data);
        setOffset(gifsResult.pagination.count);
      });
    }
    
  },[query]);

  const onHandleChange = debounce((input) => {
    setQuery(input.target.value);
  }, 500);

  function onHandleClick(value) {
    if (showDetail) return;
    setShowDetail(true);
    setSelectedValue(value);
  }

  function hideDetail() {
    setShowDetail(false);
    setSelectedValue(null);
  }

  function loadMoreResults(isLoadingNext = false) {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=jOPMdqZ0WoT2whk7HjnLANXBFa5xblms&limit=10&offset=${offset}`)
      .then((result) => result.json())
      .then((gifsResult) => {
        setGifs([...gifs, ...gifsResult.data]);
        setOffset(offset + gifsResult.pagination.count);
        if (isLoadingNext) {
          loadNextGif(null, gifs.length + gifsResult.data.length, [...gifs, ...gifsResult.data]);
        }
      });
  }

  function loadPreviousGif() {
    const index = gifs.findIndex(g => g.id === selectedValue.id);
    if (index === 0) return;
    setSelectedValue(gifs[index - 1]);
  }
  
  function loadNextGif(event, gifsQuantity, newArray = []) {
    const index = newArray.length > 0 ? newArray.findIndex(g => g.id === selectedValue.id) : gifs.findIndex(g => g.id === selectedValue.id);
    const quantity = gifsQuantity ?? gifs.length;
    if (index + 1 === quantity) {
      loadMoreResults(true);
      return;
    }
    if (newArray.length) setSelectedValue(newArray[index+1]);
    else setSelectedValue(gifs[index + 1]);
  }

  return (
    <div className={styles.wrapper}>
      <div className={!showDetail ? styles.container : styles.hiddenContainer}>
        <SearchBar handleChange={onHandleChange}/>
        <List listValues={gifs} handleClick={onHandleClick}/>
        {gifs.length > 0 && <button className={styles.loadMore} onClick={loadMoreResults}>Load More</button>}
      </div>
      { showDetail && 
        <div className={styles.detail}>
          <button className={styles.closeButton} onClick={hideDetail}>Close</button>
          <div>
            <Detail value={selectedValue}/>
            <div className={styles.navButtons}>
              <button onClick={loadPreviousGif}>Previous</button>
              <button onClick={loadNextGif}>Next</button>
            </div>
          </div>
        </div>
      }
    </div>
    
   
  )
}

export default App
