import React, { useState } from 'react';
import { handleUserAddNote } from '../../../reducers/userStatsReducer';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../Error';

const Modal = ({ title, desc, modalId }) => {
  const [formActive, setFormActive] = useState(false);
  const error = useSelector((state) => state.error);

  const handleAddNoteBtn = (e) => {
    e.preventDefault();
    setFormActive(true);
  };

  return (
    <dialog id={`my_modal_${modalId}`} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        {error && error.type === 'userError' ? <Error error={error} /> : null}
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">{title}</h3>
          {formActive ? (
            <Form desc={desc} verseId={modalId} setFormActive={setFormActive} />
          ) : null}

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

const Form = ({ desc, verseId, setFormActive }) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState(!desc ? '' : desc);

  const handleAddNote = (e) => {
    e.preventDefault();
    dispatch(handleUserAddNote(note, verseId));
    setFormActive(false);
  };

  return (
    <form className="flex gap-5">
      <input
        type="text"
        placeholder="Add your notes here"
        className="input input-bordered input-lg w-full max-w-xs"
        value={note}
        onChange={({ target }) => setNote(target.value)}
      />
      {!desc ? (
        <button className="btn self-center" onClick={(e) => handleAddNote(e)}>
          Add note
        </button>
      ) : (
        <button className="btn self-center">Update note</button>
      )}
    </form>
  );
};

export default Modal;
