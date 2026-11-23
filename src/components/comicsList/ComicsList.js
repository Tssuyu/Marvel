import { useState, useEffect, useRef } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [newComicsError, setNewComicsError] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const isLoadingMore = useRef(false);
    const {loading, error, getAllComics} = useMarvelService();

    const onComicsLoaded = (newComics, isNextEmpty) => {
        setComics(prevComics => [...prevComics, ...newComics]);
        setNewComicsLoading(false);
        setNewComicsError(false);
        setAllLoaded(isNextEmpty);
        isLoadingMore.current = false;
    }

    const onError = () => {
        setNewComicsError(isLoadingMore.current);
        setNewComicsLoading(false);
        isLoadingMore.current = false;
    }

    const getComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(4, offset)
            .then(comics => {
                getAllComics(4, offset + 4)
                    .then(nextComics => {
                        onComicsLoaded(comics, nextComics.length === 0 || comics.length < 4)
                    })
                    .catch(() => {
                        console.log('Ups! NextComics error!');
                        onComicsLoaded(comics, false);
                    })
            })
            .catch(() => onError()); 
    }

    useEffect(() => {
        getComics(0, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadMore = () => {
        if (allLoaded) {
            return;
        }
        isLoadingMore.current = true;
        setNewComicsLoading(true);
        getComics(comics.length, false);
    }

    const content = comics.map((comic, i) => {
        const {thumbnail, title, price} = comic;
        return (
            <li className="comics__item" key={i}>
                <a href="#">
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}$</div>
                </a>
            </li>
        )
    })

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {
                    error ? (<li className="char__message"><ErrorMessage/></li>) : 
                    loading && !newComicsLoading ? (<li className="char__message"><Spinner/></li>) : 
                    content
                }
            </ul>
            {newComicsError && (
                <ErrorMessage/>
            )}
            {comics.length > 0 && !error && (
                <button
                    className={`button button__main button__long ${allLoaded ? 'button__success' : ''}`}
                    onClick={onLoadMore}
                    disabled={allLoaded || newComicsLoading}
                    style={{
                        '--button-color': allLoaded ? '#28a745' : '#9F0013'
                    }}>
                        <div className="inner">
                            {newComicsLoading ? <Spinner size={20} color="#fff"/> : allLoaded ? 'done' : 'load more'}
                        </div>
                </button>
            )}
        </div>
    )
}

export default ComicsList;