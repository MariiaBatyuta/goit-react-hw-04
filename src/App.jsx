import { useEffect, useState, useRef } from 'react';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import { handlePhotoAPI } from './components/photoAxios/photoAxios';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMore from './components/LoadMore/LoadMore';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [query, setQuery] = useState('');
  const [resultPhoto, setResultPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [indexPhoto, setIndexPhoto] = useState(null);

  const galleryRef = useRef(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await handlePhotoAPI(query, page);
        if (data.length === 0) {
          setHasMore(false);
          toast.error("No results found.");
        } else {
          setResultPhoto(prevResult => [...prevResult, ...data]);
          setHasMore(true);
        }
      } catch (error) {
        toast.error("Oops, something went wrong. Try reloading the page and entering the request again.");
      } finally {
        setIsLoading(false);
      }
    }
    if (query !== '' && page !== 0) {
      getData();
    }
  }, [query, page]);

  useEffect(() => {
    if (resultPhoto.length > 0 && page > 1) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [resultPhoto]);

  const handleQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setResultPhoto([]);
    setHasMore(true);
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

  return (
    <>
      <Toaster position='top-left'/>
      <SearchBar onSearch={handleQuery} />
      <div ref={galleryRef}>
        <ImageGallery items={resultPhoto} onClick={openModal} />
      </div>
      {hasMore && resultPhoto.length >= 12 && <LoadMore handleNextPage={handleNextPage} />}
      {isLoading && <Loader />} 
      
      <ImageModal photos={resultPhoto} closeModal={closeModal} modalIsOpen={modalIsOpen} indexPhoto={indexPhoto} />
    </>
  );
}

export default App;
