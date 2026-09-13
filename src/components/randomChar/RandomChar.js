import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {}
    }

    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar = () => this.marvelService.getCharacter((Math.floor(Math.random() * 20) + 1))
        .then(this.onCharLoaded);

    // updateChar = () => {
    //     // const id = Math.floor(Math.random() * 20) + 1;
    //     const id = 4;
    //     const char = this.marvelService.getCharacter(id);
    //     this.onCharLoaded(char);
    // }

    cutText = (text) => {
        if (!text) return '';
        return text.length > 150
            ? text.slice(0, 150) + '...'
            : text;
    }

    render() {
        const {char: {name, description, thumbnail, homepage, wiki}} = this.state;



        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img 
                        src={thumbnail} 
                        alt="Random character" 
                        className="randomchar__img"
                        onError={(e) => {
                            if (this.state.char.id === 1) e.target.src = 'https://img.championat.com/c/900x900/news/big/l/d/vse-filmy-marvel_16906220511081609251.jpg';
                            if (this.state.char.id === 4) e.target.src = 'https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/915765/hot-toys-marvel-hulk-sixth-scale-figure-gallery-6a5e672f7ff36.jpg'
                        }}
                    />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {this.cutText(description)}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;