import Modal from 'react-modal';
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default function ImageModal({ photos, modalIsOpen, closeModal, indexPhoto }) { 
    if (!photos || photos.length === 0 || indexPhoto === null) {
        return null;
    }
  
    const url = photos[indexPhoto]?.urls?.regular; 
    
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div>
            <img
              className={css.image}
              src={url}
              alt={photos[indexPhoto]?.alt_description}
              onClick={closeModal}
            />
          </div>
        </Modal>
      </div>
    );
}