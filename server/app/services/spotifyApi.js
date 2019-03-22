const SpotifyWebApi = require('spotify-web-api-node');
const request = require('superagent');

const spotifyApi = new SpotifyWebApi({
    refreshToken: 'YOUR_DATA',
    clientId: 'YOUR_DATA',
    clientSecret: 'YOUR_DATA'
});

module.exports = () => {
    return {
        getProfile: getProfile,
        getProfileCurrentSong: getProfileCurrentSong,
        profilePlaylists: profilePlaylists,
        playlistTracks: playlistTracks,
        addPlaylist: addPlaylist,
        addPlaylistTrack: addPlaylistTrack,
        removePlaylistTrack: removePlaylistTrack,
        getToken: getToken,
        getPlaylistInfo: getPlaylistInfo,
        playSong: playSong,
        pauseSong: pauseSong,
        nextTrack: nextTrack,
        previousTrack: previousTrack
    };
};

async function getToken(clientId, clientSecret, code, urlRedirect) {
    let authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const data = await request.post('https://accounts.spotify.com/api/token')
        .send('grant_type=authorization_code')
        .send(`code=${code}`)
        .send(`redirect_uri=${urlRedirect}`)
        .set('Authorization', `Basic ${authorization}`);
    return data.body || {};
}

async function getProfile() {
    await refreshAccessToken();
    const data = await spotifyApi.getMe();
    return data.body || {};
}

async function getProfileCurrentSong() {
    await refreshAccessToken();
    const data = await spotifyApi.getMyCurrentPlayingTrack();
    return data.body || {};
}

async function playSong() {
    await refreshAccessToken();
    const data = await spotifyApi.play();
    return data.body || {};
}

async function pauseSong() {
    await refreshAccessToken();
    const data = await spotifyApi.pause();
    return data.body || {};
}

async function nextTrack() {
    await refreshAccessToken();
    const data = await spotifyApi.skipToNext();
    return data.body || {};
}

async function previousTrack() {
    await refreshAccessToken();
    const data = await spotifyApi.skipToPrevious();
    return data.body || {};
}
async function profilePlaylists() {
    await refreshAccessToken();
    const data = await spotifyApi.getUserPlaylists();
    return data.body.items || [];
}

async function playlistTracks(playlistId) {
    await refreshAccessToken();
    const data = await spotifyApi.getPlaylistTracks(playlistId);
    return data.body || {};
}

async function addPlaylist(name) {
    await refreshAccessToken();
    const profile = await getProfile();
    const data = await spotifyApi.createPlaylist(profile.id, name);
    return data.body || {};
}
async function addPlaylistTrack(playlistId, tracks) {
    await refreshAccessToken();
    const data = await spotifyApi.addTracksToPlaylist(playlistId, tracks);
    return data.body || {};
}

async function removePlaylistTrack(playlistId, tracks) {
    await refreshAccessToken();
    const data = await spotifyApi.removeTracksFromPlaylist(playlistId, tracks);
    return data.body || {};
}
async function getPlaylistInfo(playlistId) {
    await refreshAccessToken();
    const data = await spotifyApi.getPlaylist(playlistId);
    return data.body || {};
}

function refreshAccessToken() {
    return spotifyApi.refreshAccessToken()
        .then(
            (data) => {
                spotifyApi.setAccessToken(data.body.access_token);
            });
}
