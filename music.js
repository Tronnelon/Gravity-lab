(() => {
  const toggle = document.getElementById('music-toggle');
  const volume = document.getElementById('music-volume');
  const level = document.getElementById('music-level');
  const status = document.getElementById('music-status');
  const storageKey = 'gravity-lab-music';
  const defaultVolume = 30;
  let enabled = false;
  let context, gain, source, bufferPromise, stopTimer;
  let playbackRequest = 0;

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.enabled === true) enabled = true;
    if (Number.isFinite(saved?.volume) && saved.volume >= 0 && saved.volume <= 100) {
      volume.value = saved.volume;
    }
  } catch {
    volume.value = defaultVolume;
  }

  function saveSettings() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ enabled, volume: Number(volume.value) }));
    } catch {
      // Audio remains usable when storage is unavailable.
    }
  }

  function updateControls() {
    toggle.setAttribute('aria-pressed', String(enabled));
    level.textContent = volume.value + ' %';
  }

  function fadeTo(target, duration) {
    const now = context.currentTime;
    const parameter = gain.gain;
    if (typeof parameter.cancelAndHoldAtTime === 'function') {
      parameter.cancelAndHoldAtTime(now);
    } else {
      const current = parameter.value;
      parameter.cancelScheduledValues(now);
      parameter.setValueAtTime(current, now);
    }
    parameter.linearRampToValueAtTime(target, now + duration);
  }

  function crossfadeLoop(original) {
    const overlap = Math.min(Math.round(original.sampleRate * 0.65), Math.floor(original.length / 4));
    const length = original.length - overlap;
    const loop = context.createBuffer(original.numberOfChannels, length, original.sampleRate);

    for (let channel = 0; channel < original.numberOfChannels; channel++) {
      const input = original.getChannelData(channel);
      const output = loop.getChannelData(channel);
      output.set(input.subarray(overlap, length));
      for (let i = 0; i < overlap; i++) {
        const mix = i / Math.max(1, overlap - 1);
        output[length - overlap + i] = input[length + i] * (1 - mix) + input[i] * mix;
      }
    }

    return loop;
  }

  async function startMusic() {
    const request = ++playbackRequest;
    status.hidden = true;
    try {
      if (!context) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        context = new AudioContextClass();
        gain = context.createGain();
        gain.gain.value = 0;
        gain.connect(context.destination);
      }
      if (context.state !== 'running') await context.resume();
      if (!enabled || request !== playbackRequest) return;

      clearTimeout(stopTimer);
      if (!source) {
        bufferPromise ??= fetch('./deep-space-drift.m4a').then(async response => {
          if (!response.ok) throw new Error('Could not load music');
          return crossfadeLoop(await context.decodeAudioData(await response.arrayBuffer()));
        }).catch(error => {
          bufferPromise = undefined;
          throw error;
        });
        const buffer = await bufferPromise;
        if (!enabled || request !== playbackRequest) return;

        source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        source.start();
      }
      fadeTo(Number(volume.value) / 100, 0.7);
    } catch {
      if (request !== playbackRequest) return;
      status.textContent = 'Kunne ikke spille bakgrunnslyden. Trykk på høyttaleren for å prøve igjen.';
      status.hidden = false;
      enabled = false;
      updateControls();
    }
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    saveSettings();
    updateControls();
    if (enabled) {
      void startMusic();
      return;
    }

    ++playbackRequest;
    status.hidden = true;
    if (!source) return;
    fadeTo(0, 0.45);
    stopTimer = setTimeout(() => {
      source.stop();
      source.disconnect();
      source = undefined;
    }, 500);
  });

  volume.addEventListener('input', () => {
    updateControls();
    saveSettings();
    if (enabled && source) fadeTo(Number(volume.value) / 100, 0.1);
  });

  document.getElementById('play').addEventListener('click', () => {
    if (enabled && (!source || context.state !== 'running')) void startMusic();
  });

  updateControls();
})();
