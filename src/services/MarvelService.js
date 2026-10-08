//import data from '../db.json';

class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/characters';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (limit = 5, offset = 0) => {
        // if (offset > 0) {                                            error for testing newCharsError
        //     throw new Error('Test Load More error');
        // }
        const res = await this.getResource(`${this._apiBase}?limit=${limit}&offset=${offset}&${this._apiKey}`);  // getting data from real server
        return res.data.results.map(this._transformCharacter);
        //return data.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);    // getting data from real server
        return this._transformCharacter(res.data.results[0]);
        // const char = data.data.results.find(char => char.id === id);    // getting local data from db.json
        // return this._transformCharacter(char);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;