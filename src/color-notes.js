// Convert frequency into integer from 0 to 11
function freqToPitchClass(frequency) {
  // Distance to A = 440 Hz
  const noteDistance = Math.log2(frequency / 440) % 1;
  const semitoneApprox = Math.round(Math.abs(noteDistance) * 12);

  let pitchClassApprox = noteDistance < 0 
    ? 8 - semitoneApprox
    : 8 + semitoneApprox;

  pitchClassApprox = ((pitchClassApprox % 12) + 12) % 12;
  return pitchClassApprox;
}


function colorNotePlayed() {
  // Get last detected frequency
  const lastFrequency = globalThis.freqHistory.at(-1);
  const pitchClassApprox = freqToPitchClass(lastFrequency);

  updateNotesColor(pitchClassApprox);
}


function updateNotesColor(pitchClass) {
  // Uncolor notes
  const notes = Array.from(document.querySelectorAll("[data-note]:not(.not-playing)"));
  notes.forEach(note => note.classList.add("not-playing"));

  // Color note instances of pitch class played
  const playedNote = Array.from(
    document.querySelectorAll(`[data-note="${pitchClass}"]`)
  );
  playedNote.forEach(note =>  note.classList.remove("not-playing"));
}