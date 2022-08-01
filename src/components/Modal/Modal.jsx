// import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ showModal, toggleModal, modalImgUrl }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('Keydown', handleKeyDown);
    };
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape' && showModal) {
      toggleModal();
    }
  };

  return (
    <div className="Overlay" onClick={toggleModal}>
      <div className="Modal">
        <img src={modalImgUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImgUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
// export class Modal extends React.Component {
//   componentDidMount() {
//     console.log('didmount');
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     console.log('unmount');
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape' && this.props.showModal) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     return (
//       <div className="Overlay" onClick={this.props.toggleModal}>
//         <div className="Modal">
//           <img src={this.props.modalImgUrl} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   modalImgUrl: PropTypes.string.isRequired,
//   toggleModal: PropTypes.func.isRequired,
//   showModal: PropTypes.bool.isRequired,
// };
