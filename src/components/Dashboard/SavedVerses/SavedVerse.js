import React from 'react';
import { useDispatch } from 'react-redux';
import { handleUserDeleteSavedVerse } from '../../../reducers/userStatsReducer';
import Modal from './Modal';

const SavedVerse = ({ verse }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-base-200 p-5 rounded-xl flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">
          {verse.book} {verse.verse}
        </h1>
        <p className="text-md">{verse.text}</p>
      </div>
      <div className="flex gap-5">
        <button
          className="btn btn-outline btn-warning"
          onClick={() => dispatch(handleUserDeleteSavedVerse(verse._id))}
        >
          Remove
        </button>
        <button
          className="btn btn-outline"
          onClick={() =>
            document.getElementById(`my_modal_${verse._id}`).showModal()
          }
        >
          See Note
        </button>
        <Modal
          title={`${verse.book} ${verse.verse}`}
          desc={verse.note}
          modalId={verse._id}
        />
      </div>
    </div>
  );
};

export default SavedVerse;
