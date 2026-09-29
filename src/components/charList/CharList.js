import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

import './charList.scss';
import cap from './notFound.avif';

class CharItem extends Component {

    render() {
        const {char, onSelect, selected, getSelectedChar} = this.props;
        const {id, name, thumbnail} = char;

        const className = selected ? "char__item char__item_selected" : "char__item";
        
        return (
            <li className={className}
                onClick={() => {
                    onSelect(id);
                    getSelectedChar(char);
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
}

class CharList extends Component {

    state = {
        chars: [],
        selectedCharId: null,
        charsCount: 9,
        loading: false,
        error: false,
        allLoaded: false
    }

    onStatusChange = () => {
        const { getStatus } = this.props;
        const { error, loading } = this.state;

        getStatus(error, loading);
    }

    onSelect = (id) => {
        this.setState({
            selectedCharId: id
        })
    }

    onCharsLoading = () => {
        this.setState(
        {
            loading: true
        },
        this.onStatusChange
        )
    }

    onCharsLoaded = (chars, count) => {
        this.setState(
        {
            chars,
            loading: false,
            allLoaded: chars.length < count
        },
        this.onStatusChange
        )
    }

    onError = () => {
        this.setState(
        {
            error: true,
            loading: false
        },
        this.onStatusChange
        );
    }

    marvelService = new MarvelService();

    getChars = (count) => {
        this.onCharsLoading();
        this.marvelService.getAllCharacters(count)
        .then(chars => this.onCharsLoaded(chars, count)).catch(this.onError); 
    }

    componentDidMount() {
        this.getChars(this.state.charsCount);
    }

    onLoadMore = () => {
        if (this.state.allLoaded) {
            return;
        }
        this.setState(
            (state) => ({
                loading: true,
                charsCount: state.charsCount + 3
            }),
            () => {
                this.getChars(this.state.charsCount);
            }
        )
    }

    render() {
        const {chars, error, loading, allLoaded, selectedCharId} = this.state;
        const {getSelectedChar} = this.props;
        const content = (!error && !loading) ? 
                    chars.map(char => {
                        return <CharItem
                            char={char}
                            key={char.id}
                            onSelect={this.onSelect}
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
                {!loading && !error && (
                    <button
                        className={`button button__main button__long ${allLoaded ? 'button__success' : ''}`}
                        onClick={this.onLoadMore}
                        disabled={allLoaded}
                        style={{
                            '--button-color': allLoaded ? '#28a745' : '#9F0013'
                        }}
                    >
                        <div className="inner">
                            {allLoaded ? 'done' : 'load more'}
                        </div>
                    </button>
                )}
            </div>
        )
    }
}

CharList.propTypes = {
    getSelectedChar: PropTypes.func,
    getStatus: PropTypes.func
}

export default CharList;