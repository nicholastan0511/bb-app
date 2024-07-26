import React from 'react';

const Modal = ({ title, desc, modalId }) => {
  return (
    <dialog id={`my_modal_${modalId}`} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{desc ? desc : null}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
