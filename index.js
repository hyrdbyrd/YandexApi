const axios = require('axios');

const API_HOST = 'https://music.yandex.ru/';

exports.Formatter = class {
    static toQueryString = (obj) => `?${Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')}`;
};

exports.YandexMusicApi = class {
    _instance = axios.create({ baseURL: API_HOST });

    getPlaylist = (owner, kinds, lang = 'ru') =>
        this._instance.get(`/handlers/playlist.jsx${exports.Formatter.toQueryString({ owner, lang, kinds })}`)
            .then(({ data }) => data.playlist)
            .catch(console.error);

    getAlbum = (album, lang = 'ru') =>
        this._instance.get(`/handlers/album.jsx${exports.Formatter.toQueryString({ album, lang })}`)
            .then(({ data }) => data);

    getArtist = (artist, lang) =>
        this._instance.get(`/handlers/artist.jsx${exports.Formatter.toQueryString({ artist, lang })}`)
            .then(({ data }) => data);
};
