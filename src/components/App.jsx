// import React from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages } from 'utils/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchStr, setSearchStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');

  const toggleModal = id => {
    let modalImgUrl = '';
    if (id && typeof id === 'number') {
      for (let i = 0; i < images.length; i++) {
        if (images[i].id === id) {
          modalImgUrl = images[i].largeImageURL;
          break;
        }
      }
    }
    setShowModal(!showModal);
    setModalImgUrl(modalImgUrl);
  };
  useEffect(() => {
    if (searchStr !== '') {
      fetchImages();
    }
  }, [searchStr, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const fetchImages = async () => {
    const newImages = await getImages(searchStr, page);
    if (newImages) {
      setImages([...images, ...newImages]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSearchSubmit = value => {
    setPage(1);
    setLoading(true);
    setImages([]);
    setSearchStr(value);
  };

  return (
    <div className="App">
      <Searchbar handleSearchSubmit={handleSearchSubmit} />
      {loading ? <Loader /> : null}

      {images.length ? (
        <>
          <ImageGallery images={images} toggleModal={toggleModal} />
          <Button handleClick={handleLoadMore} text="Load More" />
        </>
      ) : null}

      {showModal && (
        <Modal
          modalImgUrl={modalImgUrl}
          toggleModal={toggleModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

// export class App extends React.Component {
//   state = {
//     images: [],
//     page: 1,
//     searchStr: '',
//     loading: false,
//     showModal: false,
//     modalImgUrl: '',
//   };

//   toggleModal = id => {
//     let modalImgUrl = '';
//     if (id && typeof id === 'number') {
//       for (let i = 0; i < this.state.images.length; i++) {
//         if (this.state.images[i].id === id) {
//           modalImgUrl = this.state.images[i].largeImageURL;
//           break;
//         }
//       }
//     }
//     this.setState({ showModal: !this.state.showModal, modalImgUrl });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchStr !== this.state.searchStr ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchImages();
//     }
//   }

//   handleLoadMore = () => {
//     this.setState({ page: this.state.page + 1, loading: true });
//   };

//   fetchImages = async () => {
//     const images = await getImages(this.state.searchStr, this.state.page);
//     if (images) {
//       this.setState(prevState => {
//         return {
//           ...prevState,
//           images: [...prevState.images, ...images],
//           loading: false,
//         };
//       });
//     } else {
//       this.setState({
//         loading: false,
//       });
//     }
//   };

//   handleSearchSubmit = value => {
//     this.setState({ images: [], page: 1, searchStr: value, loading: true });
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar handleSearchSubmit={this.handleSearchSubmit} />
//         {this.state.loading ? <Loader /> : null}

//         {this.state.images.length ? (
//           <>
//             <ImageGallery
//               images={this.state.images}
//               toggleModal={this.toggleModal}
//             />
//             <Button handleClick={this.handleLoadMore} text="Load More" />
//           </>
//         ) : null}

//         {this.state.showModal && (
//           <Modal
//             modalImgUrl={this.state.modalImgUrl}
//             toggleModal={this.toggleModal}
//             showModal={this.state.showModal}
//           />
//         )}
//       </div>
//     );
//   }
// }
