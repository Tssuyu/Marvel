import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';
import cap from './notFound.avif';

const CharItem = (props) => {

    const {char, onSelect, selected, getSelectedChar} = props;
    const {id, name, thumbnail} = char;
    const className = selected ? "char__item char__item_selected" : "char__item";
    
    return (
        <li className={className}
            tabIndex={0}
            onClick={() => {
                onSelect(id);
                getSelectedChar(char);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(id);
                    getSelectedChar(char);
                }
            }}>
            <img src={thumbnail} 
                alt={name}
                onError={(e) => {
                    e.target.src=cap;
                }}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

const marvelService = new MarvelService();

const CharList = (props) => {

    const { getStatus } = props;
    const [chars, setChars] = useState([]);
    const [selectedCharId, setSelectedCharId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [newCharsError, setNewCharsError] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const isLoadingMore = useRef(false)

    useEffect(() => {
        getStatus(error, loading);
    }, [error, loading, getStatus]);

    const onSelect = (id) => {
        setSelectedCharId(id);
    }

    const onCharsLoaded = (newChars, isNextEmpty) => {
        setChars(prevChars => [...prevChars, ...newChars]);
        setLoading(false);
        setNewCharsLoading(false);
        setNewCharsError(false);
        setAllLoaded(isNextEmpty);
        isLoadingMore.current = false;
    }

    const onError = () => {
        setError(!isLoadingMore.current);
        setNewCharsError(isLoadingMore.current);
        setLoading(false);
        setNewCharsLoading(false);
        isLoadingMore.current = false;
    }

    const getChars = (offset) => {
        marvelService.getAllCharacters(5, offset)
            .then(chars => {
                marvelService.getAllCharacters(5, offset + 5)
                    .then(nextChars => {
                        onCharsLoaded(chars, nextChars.length === 0 || chars.length < 5)
                    })
                    .catch(() => {
                        console.log('Ups! NextChars error!');
                        onCharsLoaded(chars, false);
                    })
            })
            .catch(() => onError()); 
    }

    useEffect(() => {
        getChars(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadMore = () => {
        if (allLoaded) {
            return;
        }
        isLoadingMore.current = true;
        setNewCharsLoading(true);
        getChars(chars.length);
    }

    const {getSelectedChar} = props;
    const content = (!error && !loading) ? 
                chars.map(char => {
                    return <CharItem
                        char={char}
                        key={char.id}
                        onSelect={onSelect}
                        selected={selectedCharId === char.id}
                        getSelectedChar={getSelectedChar}
                        />
                }) : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {
                    error ? (<li className="char__message"><ErrorMessage/></li>) : 
                    loading ? (<li className="char__message"><Spinner/></li>) : 
                    content
                }
            </ul>
            {newCharsError && (
                <ErrorMessage/>
            )}
            {!loading && !error && (
                <button
                    className={`button button__main button__long ${allLoaded ? 'button__success' : ''}`}
                    onClick={onLoadMore}
                    disabled={allLoaded || newCharsLoading}
                    style={{
                        '--button-color': allLoaded ? '#28a745' : '#9F0013'
                    }}
                >
                    <div className="inner">
                        {newCharsLoading ? <Spinner size={20} color="#fff"/> : allLoaded ? 'done' : 'load more'}
                    </div>
                </button>
            )}
        </div>
    )
}

CharList.propTypes = {
    getSelectedChar: PropTypes.func,
    getStatus: PropTypes.func
}

export default CharList;