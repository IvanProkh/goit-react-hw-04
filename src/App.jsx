import { useEffect, useState, useRef } from 'react';
import { fetchImages } from './api/api';
import { Toaster } from 'react-hot-toast';

import './App.css';
import Modal from 'react-modal';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from '../src/components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  Modal.setAppElement('#root');

  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function openModal(photo) {
    setModalImage(photo);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const onSubmit = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setImage([]);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getImagesData() {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchImages(searchQuery, page);
        setTotalPages(data.total_pages);
        setImage(prevPhotos => {
          return [...prevPhotos, ...data.results];
        });

        if (data.results.length === 0) {
          setError(true);
        }

        // console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImagesData();
  }, [searchQuery, page]);

  const galleryRef = useRef();

  return (
    <div>
      <SearchBar onSubmit={onSubmit}></SearchBar>
      {error && <ErrorMessage></ErrorMessage>}
      <ImageGallery
        ref={galleryRef}
        openModal={openModal}
        galleryItems={image}
      ></ImageGallery>
      {image.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleClick}></LoadMoreBtn>
      )}
      {isLoading && <Loader></Loader>}
      <Toaster position="top-center" />
      <ImageModal
        modalPhoto={modalImage}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      ></ImageModal>
    </div>
  );
}

export default App;
