import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {

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

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList getSelectedChar={getSelectedChar} getStatus={getStatus}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar} error={error} loading={loading}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;