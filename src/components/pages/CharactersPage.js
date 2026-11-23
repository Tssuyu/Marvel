import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const CharactersPage = () => {

    const [selectedChar, setSelectedChar] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getSelectedChar = (char) => {
        setSelectedChar(char);
    }
    
    const getStatus = (error, loading) => {
        setError(error);
        setLoading(loading);
    }

    const cutText = (text) => {
        if (!text) return '';
        return text.length > 150
            ? text.slice(0, 150) + '...'
            : text;
    }

    return (
          <>
            <ErrorBoundary>
                <RandomChar cutText={cutText}/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getSelectedChar={getSelectedChar} getStatus={getStatus}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar} error={error} loading={loading} cutText={cutText}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default CharactersPage;