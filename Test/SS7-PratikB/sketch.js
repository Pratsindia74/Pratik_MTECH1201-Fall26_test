/*
Name: Pratik Bagchi
Title: Audio-Reactive Multi-Track Particle Constellation
Instructions: Move the mouse to narrow down the particle convergence point. Each particle reacts independently to distinct sonic layers across your 20-track mix simulation.
*/

let posX = []; // Array for X coordinates
let posY = []; // Array for Y coordinates
let myAudio;
let audioStarted = false;
let audioContext;
let analyser;
let frequencyData;
let stemDrums;
let stemBass;
let stemGuitar;
let stemPiano;
let stemOther;
let stemVocals;
let stemSynthesizer;
let stemAnalyzers = [];
let stemFrequencyData = [];

function setup() {
    createCanvas(800, 800);
    
    // Initialize standard HTML5 audio to prevent library scope errors
    myAudio = new Audio('assets/riseSlow.m4a');
    stemDrums = new Audio('assets/riseSlow_drums.mp3');
    stemBass = new Audio('assets/riseSlow_bass.mp3');
    stemGuitar = new Audio('assets/riseSlow_guitar.mp3');
    stemOther = new Audio('assets/riseSlow_other.mp3');
    stemGuitar = new Audio('assets/riseSlow_guitar.mp3');
    stemPiano = new Audio('assets/riseSlow_Piano.m4a');
    stemVocals = new Audio('assets/riseSlow_Vocals.mp3');
    stemSynthesizer = new Audio('assets/riseSlow_synthesizer.m4a');
   
let stems = [
    stemDrums,
    stemBass,
    stemGuitar,
    stemPiano,
    stemOther,
    stemSynthesizer,
    stemVocals
   ];
  
    myAudio.loop = true;
    audioContext = new AudioContext();         // An analyzer that measures the song's changing frequencies
    analyser = audioContext.createAnalyser();
let source = audioContext.createMediaElementSource(myAudio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    frequencyData = new Uint8Array(analyser.frequencyBinCount); // These lines allow the music to reach your speakers while the analyzer collects frequency information
for (let stem of stems) { 
let stemSource = audioContext.createMediaElementSource(stem);
let stemAnalyser = audioContext.createAnalyser();

  stemSource.connect(stemAnalyser);
  stemAnalyser.fftSize = 2048;

  stemAnalyzers.push(stemAnalyser);
  stemFrequencyData.push(
    new Uint8Array(stemAnalyser.frequencyBinCount)
  );
}
    // Initializing the two arrays with 20 elements representing your 20 audio tracks
    for (let i = 0; i < 20; i++) {
        posX.push(random(width));
        posY.push(random(height));
    }
}

function draw() {
    analyser.getByteFrequencyData(frequencyData); // Get the frequency data for the current frame
    stemAnalyzers[6].getByteFrequencyData(stemFrequencyData[6]);
    background(10, 10, 25, 60); // Soft trailing motion blur effect

    strokeWeight(1.5);

    // Iterate through the array using .length
for (let i = 0; i < posX.length; i++) {
 let frequencyIndex = floor(map(i, 0, 19, 2, 350));
 let soundLevel = frequencyData[frequencyIndex];
 let danceStyle = 1 + (i % 5) * 0.25;
 let danceDirection = i % 2 === 0 ? 1 : -1;
 let trackFrequencyPulse = 0;

if (i <= 5) {
  trackFrequencyPulse = soundLevel * 0.5;
} else if (i < 19) {
  trackFrequencyPulse = soundLevel * 0.15;
} else { // Track 20 (index) will now have its own smooth, floating movement, separate from the other 19 particles
 let vocalLevel = 0;

for (let v = 20; v <= 120; v++) {
  vocalLevel += stemFrequencyData[6][v];
}

vocalLevel = vocalLevel / 101;

let highVocal = stemFrequencyData[6][120];
vocalLevel = vocalLevel + highVocal * 0.8;
  trackFrequencyPulse = vocalLevel * 0.4
    + sin(frameCount * 0.025) * 15;
}
        
        // Differentiating the vocal track (Track 20) with gold highlight
        // Individual colors for all 20 musical tracks
 let trackColors = [
  [255, 255, 255], // 1 Main Kick - WHITE (temporary)
  [230, 70, 40],    // 2  Sub Kick
  [255, 120, 50],   // 3  Snare
  [180, 50, 255],    // 4 Closed Hi-Hats - Purple
  [50, 255, 255],    // 5 Cymbals - Cyan
  [255, 60, 160],    // 6 Percussion - Pink
  [50, 150, 255],   // 7  Sub Bass
  [70, 180, 255],   // 8  Mid-Bass
  [90, 200, 255],   // 9  Bass Distortion
  [100, 220, 255],  // 10 Lead Synth
  [120, 100, 255],  // 11 Arpeggiator
  [150, 100, 255],  // 12 Counter-Melody
  [180, 100, 255],  // 13 Synth Chords
  [255, 100, 220],  // 14 Atmospheric Pad
  [255, 100, 180],  // 15 Shimmers
  [100, 255, 200],  // 16 Risers
  [50, 255, 150],   // 17 Impact FX
  [255, 180, 200],  // 18 Vocal Harmonies
  [255, 150, 180],  // 19 Vocal Ad-libs
  [255, 215, 0]     // 20 Lead Vocal — GOLD
];

let c = trackColors[i];
stroke(c[0], c[1], c[2], 180);
fill(c[0], c[1], c[2], 220);
        // Draw lines narrowing towards the cursor
       line(
  constrain(posX[i], 20, width - 20),
  constrain(posY[i] + trackFrequencyPulse, 20, height - 20),
  constrain(mouseX, 20, width - 20),
  constrain(mouseY, 20, height - 20)
);

        // Organic movement
    if (i === 19) { // Track 20 (index) will now have its own smooth floating movement, seperate from the other 19 particles
        posX[i] = 400 + cos(frameCount * 0.018) * 140;
let vocalRise = map(stemFrequencyData[6][120], 0, 255, 0, 180);

    posY[i] = 400 + sin(frameCount * 0.018) * 100 - vocalRise;
}    else if (i === 0) {
let kickLevel = frequencyData[3];
    posX[i] += cos(frameCount * 0.02) * 0.5;
    posY[i] += sin(frameCount * 0.08) * (0.5 + kickLevel * 0.04);

} else if (i === 1) {
    // Track 2: Sub Kick Drum
let subKickLevel = frequencyData[2];

    posX[i] += sin(frameCount * 0.025) * (0.4 + subKickLevel * 0.025);
    posY[i] += cos(frameCount * 0.012) * 0.4;

} else {
    // Tracks 3–19: Existing movements
    posX[i] += cos(frameCount * 0.03 * danceStyle + i) * danceDirection * (0.3 + soundLevel * 0.015);
    posY[i] += sin(frameCount * 0.03 * danceStyle + i) * (0.3 + soundLevel * 0.015);
}
        posX[i] = constrain(posX[i], 20, width - 20); // Keep particles within the canvas boundaries
        posY[i] = constrain(posY[i], 20, height - 20);

        noStroke();
        ellipse(
        posX[i],
        constrain(posY[i] + trackFrequencyPulse, 20, height - 20),
        16, 16
);
}
}

function mousePressed() {
       audioContext.resume();
    // Play audio directly inside the user click event
    if (!audioStarted) {
        stemVocals.currentTime = 0;
        stemVocals.play().catch(err => console.log("Vocal stem:", err));
        myAudio.play().then(() => {
            audioStarted = true;
        }).catch(err => console.log("Audio play blocked:", err));
        stemVocals.currentTime = 0;
        stemVocals.play().catch(err => console.log("Vocal stem:", err));
    } else {
        myAudio.currentTime = 0; // Resets and plays on subsequent clicks
        myAudio.play();
    }
}