import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (limit = 5, offset = 0) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (limit = 4, offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const _transformCharacter = (char) => {
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

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            pageCount: comic.pageCount,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            textObjects: comic.textObjects,
            price: comic.prices[0].price
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError}
}

export default useMarvelService;