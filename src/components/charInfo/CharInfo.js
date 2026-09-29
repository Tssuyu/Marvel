import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types';

import './charInfo.scss';
import cap from '../charList/notFound.avif';

const cutText = (text) => {
    if (!text) return '';

    return text.length > 150
        ? text.slice(0, 150) + '...'
        : text;
}

class CharInfo extends Component {

    render() { 
        const {error, loading, selectedChar} = this.props;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        const skeleton = (!loading && !error && !selectedChar.id) ? <Skeleton/> : null;
        const content = (!loading && !error && selectedChar.id) ? <View selectedChar={selectedChar}/> : null;
        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {skeleton}
                {content}
            </div>
        )
    }
}

const View = ({selectedChar}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = selectedChar;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} 
                    alt={name}
                    onError={(e) => e.target.src=cap}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {cutText(description)}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length > 0 ? 
                    comics.slice(0, 10).map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item}
                            </li>
                        )
                    }) : 'There is no comics with this character'
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectedChar: PropTypes.object,
    error: PropTypes.bool,
    loading: PropTypes.bool
}

export default CharInfo;