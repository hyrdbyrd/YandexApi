# YandexApi

```js
(async () => {
    const { YandexMusicApi } = require('../index');

    const m = new YandexMusicApi();

    const userName = 'IRuss23';
    const playlistId = '3';

    const playlist = await m.getPlaylist(userName, playlistId);

    console.log(playlist.tracks.map(({ title, artists: [{ name }] }) => `${title} ${name}`).reverse());
})();
```

___

## Exmaples

If you want to try something with this lib, check [exmaples](/examples)

___

## Docs?

This lib is simply as can. Just read the [code](/index.js)
