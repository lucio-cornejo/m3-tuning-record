// Read uploaded JSON file
document.addEventListener(
  "DOMContentLoaded", function() {
    globalThis["load-recording"].addEventListener(
      "input", function (event) {
        var reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = function(event) {
          // Update window.musicData to the uploaded settings
          globalThis.recordingData = JSON.parse(event.target.result);
          playRecording();
        }
      }
    )
  }
);


function playRecording() {
  // Convert frequencies to pitch classes
  globalThis.recordingData.pitchClasses = 
    globalThis.recordingData
      .frequencies.map(freq => freqToPitchClass(freq));

  // Retrieve variables to use
  const { pitchClasses } = globalThis.recordingData;
  const { timeIntervals } = globalThis.recordingData;
  
  main(pitchClasses, timeIntervals);
}

async function main(pitchClasses, timeIntervals) {
  const timer = ms => new Promise(res => setTimeout(res, ms))

  const numFrequencies = pitchClasses.length;
  for (let i = 0; i < numFrequencies; i++) {
    await timer(timeIntervals[i]);
    updateNotesColor(pitchClasses[i]);
  }

  await timer(500);
  alert("End of recording");
}
