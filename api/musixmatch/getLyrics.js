import searchTrack from './searchTrack';

const apiPrefix = 'http://api.musixmatch.com/ws/1.1';
const apikey = '1ec507fd91c581cffbd5e199f9304705';

export default async ({ track, artist }) => {
  const trackList = await searchTrack({ track, artist });
  if (trackList.length) {
    const trackId = trackList[0].track.track_id;
    const uri = `${apiPrefix}/track.lyrics.get?apikey=${apikey}&track_id=${encodeURIComponent(trackId)}`;
    const resp = await fetch(uri);
    const json = await resp.json();
    const {
      message: {
        header,
        body,
      },
    } = json;
    return header.status_code === 200
      ? body.lyrics.lyrics_body
      : 'No lyrics found.';
  }
  return 'No lyrics found.';
};
