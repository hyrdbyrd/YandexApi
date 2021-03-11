const axios = require('axios');

const API_HOST = 'https://music.yandex.ru/';

/** Initialize logging */
const loggingDecorator = (() => {
    if (!process.env.DEBUG)
        return (field, func) => (...args) => func(...args);

    const debugLvl = process.env.DEBUG_LEVEL;

    console.log('YandexApi: DEBUG enabled');
    debugLvl && console.log('YandexApi: DEBUG LEVEL = ' + debugLvl);

    return (field, func) => (...args) => {
        console.log(`YandexApi.${field} call: ${JSON.stringify(args)}`);

        const result = new Promise(resolve => resolve(func(...args)));

        if (result instanceof Promise && debugLvl == '2')
            result
                .then(res => (console.log(`YandexApi.${field} result: ${res}`, res)))
                .catch(error => console.error(`YandexApi.${field} error: ${error}`));

        return result;
    }
})();

exports.Formatter = class {
    static toQueryString = (obj) => `?${Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')}`;
};

exports.YandexMusicApi = class {
    _instance = axios.create({ baseURL: API_HOST });

    getPlaylist = loggingDecorator('getPlaylist', (owner, kinds, lang = 'ru') =>
        this._instance.get(`/handlers/playlist.jsx${exports.Formatter.toQueryString({ owner, lang, kinds })}`)
            .then(({ data }) => data.playlist)
            .catch(console.error)
    );

    getAlbum = loggingDecorator('getAlbum', (album, lang = 'ru') =>
        this._instance.get(`/handlers/album.jsx${exports.Formatter.toQueryString({ album, lang })}`)
            .then(({ data }) => data)
    );

    getArtist = loggingDecorator('getArtist', (artist, lang) =>
        this._instance.get(`/handlers/artist.jsx${exports.Formatter.toQueryString({ artist, lang })}`)
            .then(({ data }) => data)
    );
};
