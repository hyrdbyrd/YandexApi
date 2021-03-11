(async () => {
    const { YandexMusicApi } = require('../index');

    const m = new YandexMusicApi();

    const albumId = '4817710';

    const album = await m.getAlbum(albumId);

    console.log(
        album.volumes.reduce((acc, cur) => acc.concat(cur), []).map(({ title, artists: [{ name }] }) => `${title} ${name}`)
    );
})();
