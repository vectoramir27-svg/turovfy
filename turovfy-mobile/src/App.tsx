import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TabType, Track } from './types';
import { api } from './api/client';
import { updateNativeMediaSession, updateNativePositionState } from './utils/mediaSession';
import { Navigation } from './components/Navigation';
import { MiniPlayer } from './components/MiniPlayer';
import { FullPlayer } from './components/FullPlayer';
import { LyricsModal } from './components/LyricsModal';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ArtistScreen } from './screens/ArtistScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('drops');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const [catalogTracks, setCatalogTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Record<string, Track[]>>({
    'Любимое': []
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    api.search('Phonk 2026').then((data) => {
      setCatalogTracks(data);
      setQueue(data);
    });
  }, []);

  const playIndex = useCallback((index: number, newQueue?: Track[]) => {
    const activeQueue = newQueue || queue;
    if (index < 0 || index >= activeQueue.length) return;

    const track = activeQueue[index];
    setQueue(activeQueue);
    setQueueIndex(index);
    setCurrentTrack(track);

    if (audioRef.current) {
      audioRef.current.src = api.getStreamUrl(track.id);
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [queue]);

  const handleNext = useCallback(() => {
    if (queueIndex + 1 < queue.length) {
      playIndex(queueIndex + 1);
    }
  }, [queueIndex, queue, playIndex]);

  const handlePrev = useCallback(() => {
    if (queueIndex - 1 >= 0) {
      playIndex(queueIndex - 1);
    }
  }, [queueIndex, playIndex]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    updateNativeMediaSession(currentTrack, isPlaying, {
      onPlay: togglePlay,
      onPause: togglePlay,
      onNext: handleNext,
      onPrev: handlePrev,
      onSeek: (details) => {
        if (details.seekTime && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
        }
      }
    });
  }, [currentTrack, isPlaying, togglePlay, handleNext, handlePrev]);

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    updateNativePositionState(cur, dur);
  };

  const toggleLike = (track: Track) => {
    setPlaylists((prev) => {
      const favs = prev['Любимое'] || [];
      const exists = favs.some((t) => t.id === track.id);
      return {
        ...prev,
        'Любимое': exists ? favs.filter((t) => t.id !== track.id) : [track, ...favs]
      };
    });
  };

  const isCurrentLiked = currentTrack
    ? (playlists['Любимое'] || []).some((t) => t.id === currentTrack.id)
    : false;

  return (
    <div className="min-h-screen bg-[#050507] text-white select-none">
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={handleNext}
      />

      {selectedArtist ? (
        <ArtistScreen
          artistName={selectedArtist}
          onBack={() => setSelectedArtist(null)}
          onPlayTrack={(track) => playIndex(0, [track])}
          onPlayAll={(list) => playIndex(0, list)}
        />
      ) : (
        <>
          {currentTab === 'drops' && (
            <HomeScreen
              tracks={catalogTracks}
              onPlayTrack={(idx) => playIndex(idx, catalogTracks)}
              onOpenArtist={(name) => setSelectedArtist(name)}
            />
          )}

          {currentTab === 'tasks' && (
            <SearchScreen
              onSelectTrack={(track) => playIndex(0, [track])}
              onOpenArtist={(name) => setSelectedArtist(name)}
            />
          )}

          {currentTab === 'market' && (
            <LibraryScreen
              playlists={playlists}
              onSelectTrack={(track) => playIndex(0, [track])}
              onCreatePlaylist={(name) => {
                if (!playlists[name]) setPlaylists({ ...playlists, [name]: [] });
              }}
              onDeletePlaylist={(name) => {
                const copy = { ...playlists };
                delete copy[name];
                setPlaylists(copy);
              }}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen serverIp="http://192.168.1.108:8000" />
          )}
        </>
      )}

      <MiniPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onOpenFull={() => setIsFullPlayerOpen(true)}
        progress={duration ? (currentTime / duration) * 100 : 0}
      />

      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedArtist(null);
          setCurrentTab(tab);
        }}
        onOpenLyrics={() => setIsLyricsOpen(true)}
      />

      <FullPlayer
        isOpen={isFullPlayerOpen}
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onClose={() => setIsFullPlayerOpen(false)}
        onTogglePlay={togglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={(val) => {
          if (audioRef.current) audioRef.current.currentTime = val;
        }}
        onOpenLyrics={() => {
          setIsFullPlayerOpen(false);
          setIsLyricsOpen(true);
        }}
        isLiked={isCurrentLiked}
        onToggleLike={() => currentTrack && toggleLike(currentTrack)}
      />

      <LyricsModal
        isOpen={isLyricsOpen}
        track={currentTrack}
        currentTime={currentTime}
        onClose={() => setIsLyricsOpen(false)}
      />
    </div>
  );
};

export default App;