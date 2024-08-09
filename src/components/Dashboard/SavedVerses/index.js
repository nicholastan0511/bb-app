import React from 'react';
import SavedVerse from './SavedVerse';

const SavedVerses = ({ savedVerses, notes }) => {
  const savedVersesWithNotes = savedVerses.map((verse) => {
    // match note's reference id to a verse with the verse id
    const noteForVerse = notes.find((note) => note.verse === verse._id);

    // console.log(noteForVerse);

    // if the note obj does not contain the note for this verse return the original obj
    if (noteForVerse === undefined) {
      return {
        ...verse,
      };
    } else {
      // else return with note attached
      return {
        ...verse,
        note: noteForVerse,
      };
    }

    // else return the original verse obj
  });

  console.log(savedVersesWithNotes);

  return (
    <div className="h-screen bg-stone-900 grow overflow-y-auto flex items-end">
      <div
        className={`border-2 border-b-0 border-stone-700 rounded-t-3xl w-full h-[97%] flex flex-col justify-start items-center p-10 gap-10`}
      >
        <h1 className="text-3xl font-semibold self-start">Saved Verses</h1>
        {savedVersesWithNotes.length === 0 ? (
          <p>No saved verses currently!</p>
        ) : null}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] [grid-auto-rows: 500px] gap-20 w-full">
          {savedVersesWithNotes.map((verse) => (
            <SavedVerse verse={verse} key={verse._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedVerses;
