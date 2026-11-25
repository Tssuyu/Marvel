import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Page404 from './404';

const SingleComicPage = () => {

    const { id } = useParams();
    const { getComic, loading, error, clearError } = useMarvelService();
    const [comic, setComic] = useState(null);
    
    useEffect(() => {
       updateComic(); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const updateComic = () => {
        clearError();
        getComic(id)
            .then(comic => setComic(comic))
            .catch(() => {});
    }

    const errorMessage = error ? <Page404 message={error}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && comic ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )

}

const View = ({comic}) => {
    const { title, thumbnail, description, pageCount, textObjects, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {textObjects}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;