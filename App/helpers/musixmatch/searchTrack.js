const apiPrefix = 'http://api.musixmatch.com/ws/1.1';
const apikey = '1ec507fd91c581cffbd5e199f9304705';

export default async ({ track, artist, pageSize = 0 }) => {
  const qTrack = track ? `&q_track=${encodeURIComponent(track)}` : '';
  const qArtist = artist ? `&q_artist=${encodeURIComponent(artist)}` : '';
  const uri = `${apiPrefix}/track.search?page_size=${pageSize}&apikey=${apikey}${qTrack}${qArtist}`;
  const resp = await fetch(uri);
  const json = await resp.json();
  const {
    message: {
      header,
      body,
    },
  } = json;
  return header.status_code === 200
    ? body.track_list
    : [];
};
