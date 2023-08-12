// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let pitch;
let audioContext
const modelURL = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

async function onMicrophoneGranted(stream) {
  // Set globar variable for microphone volume
  globalThis.micVolumes = [];

  audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('src/get-volume.js');
  let microphone = audioContext.createMediaStreamSource(stream);

  const node = new AudioWorkletNode(audioContext, 'vumeter')
  node.port.onmessage = (event) => {
    let _volume = 0;
    let _sensibility = 5;
    if (event.data.volume) {
      _volume = event.data.volume;
    }

    globalThis.micVolumes.push((_volume * 100) / _sensibility);
  }
  microphone.connect(node).connect(audioContext.destination);

  // Start pitch recognition
  startPitch(stream, audioContext);
}

function activeSound () {
    try {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        navigator.getUserMedia(
            { audio: true, video: false },
            onMicrophoneGranted, 
            () => console.log("Microphone access denied")
        );
    } catch(e) {
        alert(e)
    }
}


function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection(modelURL, audioContext, stream, getPitch);
}

function getPitch() {
  pitch.getPitch(async function(err, frequency) {
  // pitch.getPitch(function(err, frequency) {
    if (frequency) {
      // Get last registered microphone volume
      globalThis.volHistory.push(globalThis.micVolumes.at(-1));

      globalThis.freqHistory.push(frequency);
      globalThis.timeHistory.push(Date.now());
      colorNotePlayed();
    } else {
      console.log('No pitch detected');
    }

    // await new Promise(r => setTimeout(r, 250));
    getPitch();
  })
}
