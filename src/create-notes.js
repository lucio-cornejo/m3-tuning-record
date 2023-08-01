globalThis.freqHistory = [];

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Set uniform distance between open strings
    const generator = 4;  // M3 tuning 
    // const generator = 5;  // P4 tuning

    // Set amount of notes to create
    const numRows = 6;
    const numFrets = 12;

    // Retrieve single note created
    // const note = document.querySelector("[data-note]");
    // const pitchClass = parseInt(note.dataset.note);
    const pitchClass = 3;

    // Create rows of notes
    for (let row = 0; row < numRows; row++) {
      // Get integer between 0 and 12
      const newPitchClass = 
        (((pitchClass - generator*row) % 12) + 12) % 12;

      // Create row of notes
      const newRow = createNewNotesRow(newPitchClass);

      // Fill row of notes
      fillNotesRow(newRow, numFrets - 1, newPitchClass);
    }
  }
);


function createNewNotesRow(pitchClass) {
  const newRow = document.createElement("div");
  const note = document.createElement("div");

  newRow.classList.add("notes-row");
  note.dataset.note = pitchClass;

  newRow.appendChild(note);
  globalThis["guitar"].appendChild(newRow);

  return newRow;
}


function fillNotesRow(notesRow, numNotes, lastPitchClass) {
  if (numNotes <= 0) return;

  // Create next note for row
  const nextNote = document.createElement("div");
  const newPitchClass = (lastPitchClass + 1) % 12;
  nextNote.dataset.note = newPitchClass;

  // Append new note
  notesRow.appendChild(nextNote);

  fillNotesRow(notesRow, numNotes - 1, newPitchClass);
}