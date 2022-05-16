import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import Api from './Api';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('iddle');
  const [src, setSrc] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = e => {
    setSrc(e.currentTarget.alt);
    toggleModal();
  };

  const onLoadMoreClick = ev => {
    ev.preventDefault();
    setPage(page + 1);
    setStatus('pending');
  };

  useEffect(() => {
    if (query === '') return;

    Api(query, page).then(data => {
      setImages(prev => [...prev, ...data]);
      setStatus(data.length > 0 ? 'resolved' : 'error');
    });
  }, [page, query]);

  return (
    <div>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery status={status} images={images} onClick={onImageClick} />
      {status === 'pending' && <Loader />}
      {images.length > 0 && (
        <Button onClick={onLoadMoreClick}>Load more</Button>
      )}
      {showModal && <Modal onClose={toggleModal} src={src} />}
    </div>
  );
}
