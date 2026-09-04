export type TabType = 'drops' | 'tasks' | 'market' | 'profile';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  cover?: string;
}

export interface ArtistData {
  name: string;
  avatar: string;
  tracks: Track[];
}