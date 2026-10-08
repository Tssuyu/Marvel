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
        offset: 0,
        loading: false,
        error: false,
        newCharsLoading: false,
        newCharsError: false,
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

    onCharsLoaded = (newChars) => {
        this.setState(
        {
            chars: [...this.state.chars, ...newChars],
            loading: false,
            newCharsLoading: false,
            newCharsError: false,
            allLoaded: newChars.length < 5
        },
        this.onStatusChange
        )
    }

    onError = () => {
        const { newCharsLoading } = this.state;

        this.setState(
        {
            error: !newCharsLoading,
            newCharsError: newCharsLoading,
            loading: false,
            newCharsLoading: false
        },
        this.onStatusChange
        );
    }

    marvelService = new MarvelService();

    getChars = (offset) => {
        this.marvelService.getAllCharacters(5, offset)
        .then(chars => this.onCharsLoaded(chars))
        .catch(this.onError); 
    }

    componentDidMount() {
        this.onCharsLoading();
        this.getChars(this.state.offset);
    }

    onLoadMore = () => {
        if (this.state.allLoaded) {
            return;
        }
        this.setState(
            (state) => ({
                newCharsLoading: true,
                offset: state.offset + 5
            }),
            () => {
                this.getChars(this.state.offset);
            }
        )
    }

    render() {
        const {chars, error, loading, newCharsLoading, newCharsError, allLoaded, selectedCharId} = this.state;
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
                {newCharsError && (
                    <ErrorMessage/>
                )}
                {!loading && !error && (
                    <button
                        className={`button button__main button__long ${allLoaded ? 'button__success' : ''}`}
                        onClick={this.onLoadMore}
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
}

CharList.propTypes = {
    getSelectedChar: PropTypes.func,
    getStatus: PropTypes.func
}

export default CharList;