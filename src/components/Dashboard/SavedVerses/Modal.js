import React, { useState } from 'react';
import { handleUserAddNote } from '../../../reducers/userStatsReducer';
import { useDispatch } from 'react-redux';

const Modal = ({ title, desc, modalId }) => {
  const [formActive, setFormActive] = useState(false);

  const handleAddNoteBtn = (e) => {
    e.preventDefault();
    setFormActive(true);
  };

  return (
    <dialog id={`my_modal_${modalId}`} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">{title}</h3>
          {formActive ? <Form desc={desc} /> : null}

          {!desc && !formActive ? (
            <p className="py-4 italic">
              No note for this verse. Consider adding one.
            </p>
          ) : (
            <p className="py-4">{desc}</p>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            {!desc && !formActive ? (
              <button className="btn mr-5" onClick={handleAddNoteBtn}>
                Add note
              </button>
            ) : desc && !formActive ? (
              <button className="btn mr-5" onClick={handleAddNoteBtn}>
                Update note
              </button>
            ) : null}

            <button className="btn" onClick={() => setFormActive(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

const Form = ({ desc }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(!desc ? '' : desc);

  console.log(text);

  return (
    <form className="flex gap-5">
      <input
        type="text"
        placeholder="Add your notes here"
        className="input input-bordered input-lg w-full max-w-xs"
      />
      {!desc ? (
        <button className="btn self-center">Add note</button>
      ) : (
        <button className="btn self-center">Update note</button>
      )}
    </form>
  );
};

export default Modal;
