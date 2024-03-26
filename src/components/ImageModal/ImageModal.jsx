import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ closeModal, modalIsOpen, modalPhoto }) {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  if (!modalPhoto || !modalPhoto.urls) {
    return null;
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <img className={css.img} src={modalPhoto.urls.regular}></img>
      </Modal>
    </div>
  );
}
