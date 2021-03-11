(async () => {
    const { YandexMusicApi } = require('../index');

    const m = new YandexMusicApi();

    const artistId = '1572579';

    const artist = await m.getArtist(artistId);
    console.log(artist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).reverse());
})();
