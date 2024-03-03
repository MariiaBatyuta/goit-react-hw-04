import { useEffect, useState } from 'react';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import { handlePhotoAPI } from './components/photoAxios/photoAxios';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState('');
  const [resultPhoto, setResultPhoto] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [indexPhoto, setIndexPhoto] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await handlePhotoAPI(query, page);
        if (data.length === 0) {
          setError(true);
        } else {
          setResultPhoto(prevResult => [...prevResult, ...data]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (query !== '' && page !== 0) {
      getData();
    }
  }, [query, page]);

  const handleQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setResultPhoto([]);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const openModal = (index) => { 
    setIsOpen(true);
    setIndexPhoto(index); 
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const errorMessage = "Oops, something went wrong. Try reloading the page and entering the request again.";

  return (
    <>
      <SearchBar onSearch={handleQuery} />

      {error ? (<ErrorMessage message={errorMessage} />) : (<ImageGallery items={resultPhoto} onClick={openModal} />)}

      {resultPhoto.length >= 12 && <LoadMore handleNextPage={handleNextPage} />}
      {isLoading && <Loader />} 
      
      <ImageModal photos={resultPhoto} closeModal={closeModal} modalIsOpen={modalIsOpen} indexPhoto={indexPhoto} />
    </>
  );
}

export default App;