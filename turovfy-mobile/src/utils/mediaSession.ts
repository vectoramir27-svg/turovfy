import { Track } from '../types';

interface MediaSessionCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (details: MediaSessionActionDetails) => void;
}

export const updateNativeMediaSession = (
  track: Track | null,
  isPlaying: boolean,
  callbacks: MediaSessionCallbacks
) => {
  if (!('mediaSession' in navigator) || !track) return;

  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    album: 'TurovFy Music',
    artwork: [
      { src: track.cover || '', sizes: '96x96', type: 'image/jpeg' },
      { src: track.cover || '', sizes: '128x128', type: 'image/jpeg' },
      { src: track.cover || '', sizes: '256x256', type: 'image/jpeg' },
      { src: track.cover || '', sizes: '512x512', type: 'image/jpeg' },
    ]
  });

  navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

  navigator.mediaSession.setActionHandler('play', callbacks.onPlay);
  navigator.mediaSession.setActionHandler('pause', callbacks.onPause);
  navigator.mediaSession.setActionHandler('previoustrack', callbacks.onPrev);
  navigator.mediaSession.setActionHandler('nexttrack', callbacks.onNext);
  navigator.mediaSession.setActionHandler('seekto', callbacks.onSeek);
};

export const updateNativePositionState = (currentTime: number, duration: number) => {
  if (!('mediaSession' in navigator) || !duration || isNaN(duration)) return;

  try {
    navigator.mediaSession.setPositionState({
      duration: Math.max(duration, 0),
      playbackRate: 1,
      position: Math.min(Math.max(currentTime, 0), duration)
    });
  } catch (e) {
    // Игнорируем временные рассинхроны буферизации
  }
};