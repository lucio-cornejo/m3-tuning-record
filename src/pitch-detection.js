// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let pitch;
const modelURL = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

async function ml5Setup() {
  const audioContext = new AudioContext();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  startPitch(stream, audioContext);
}

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection(modelURL, audioContext, stream, getPitch);
}

function getPitch() {
  pitch.getPitch(async function(err, frequency) {
    if (frequency) {
      globalThis.freqHistory.push(frequency);
      globalThis.timeHistory.push(Date.now());
      try {
        colorNotePlayed();
      } catch(error) {
        console.log(error);
      }
    } else {
      // console.log('No pitch detected');
    }

    await new Promise(r => setTimeout(r, 250));
    getPitch();
  })
}
