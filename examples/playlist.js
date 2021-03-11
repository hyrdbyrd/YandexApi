(async () => {
    const { YandexMusicApi } = require('../index');

    const m = new YandexMusicApi();

    const userName = 'IRuss23';
    const playlistId = '3';

    const playlist = await m.getPlaylist(userName, playlistId);

    console.log(playlist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).reverse());
})();
