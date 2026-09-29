import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: {},
        error: false,
        loading: false
    }

    getSelectedChar = (char) => {
        this.setState({
            selectedChar: char
        })
    }
    
    getStatus = (error, loading) => {
        this.setState({
            error,
            loading
        })
    }

    render() {
        const {loading, error, selectedChar} = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList getSelectedChar={this.getSelectedChar} getStatus={this.getStatus}/>
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
    
}

export default App;