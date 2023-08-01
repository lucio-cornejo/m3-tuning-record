document.addEventListener(
  "click", function() {
    globalThis.freqHistory = [];
    globalThis.timeHistory = [];

    ml5Setup();
  },
  { once: true }
)

function recordNotes() {
  // Reset main global variables
  globalThis.freqHistory = [];
  globalThis.timeHistory = [];
}

function downloadNotes() {
  // Get consecutive differences in times
  const times = globalThis.timeHistory;
  const timeIntervals = times.slice(1).map((x,i)=> x - times[i]);
  timeIntervals.unshift(0);

  // Save data into JSON
  const frequencies = globalThis.freqHistory;
  const recording = {
    "timeIntervals": timeIntervals,
    "frequencies": frequencies
  }

  // Download data as JSON file
  const downloadData = JSON.stringify(recording);
  const a = document.createElement('a');
  document.body.appendChild(a);
  try {
    a.download = 'recording.json';
    const blob = new Blob( [downloadData] , {
      type: 'application/json'
    });
    a.href = window.URL.createObjectURL( blob );
  } catch (error) {
    a.innerHTML += ' (' + error + ')';
  }
  a.click();
  document.body.removeChild(a);
}