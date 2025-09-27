import { useEffect, useState } from "react";

function Modal({ openModal, closeModal, children }) {
  // Contrôle l'ouverture de la modal avec un état
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (openModal) {
      setIsOpen(true);  // Ouvre la modal
    } else {
      setIsOpen(false); // Ferme la modal
    }
  }, [openModal]);

  return (
    <dialog
      className="modal account-modal dashboard"
      open={isOpen}
      onCancel={closeModal}
    >
      {children}
      <button type="button" className="btn account-modal-btn-close" onClick={closeModal}>
        Fermer
      </button>
    </dialog>
  );
}

export default Modal;
