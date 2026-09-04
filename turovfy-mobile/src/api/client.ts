import { Track, ArtistData } from '../types';

const BASE_URL = 'http://192.168.1.108:8000';

export const api = {
  getStreamUrl: (id: string) => `${BASE_URL}/api/listen/${id}`,

  search: async (query: string): Promise<Track[]> => {
    try {
      const res = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error('Search error:', err);
      return [];
    }
  },

  getArtist: async (name: string): Promise<ArtistData | null> => {
    try {
      const res = await fetch(`${BASE_URL}/api/artist?query=${encodeURIComponent(name)}`);
      return await res.json();
    } catch (err) {
      console.error('Artist fetch error:', err);
      return null;
    }
  },

  getLyrics: async (title: string, artist: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/lyrics?track=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
      );
      return await res.json();
    } catch (err) {
      console.error('Lyrics fetch error:', err);
      return { type: 'none', lyrics: '' };
    }
  }
};