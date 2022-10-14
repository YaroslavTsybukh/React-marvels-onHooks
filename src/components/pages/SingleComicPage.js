import {useLocation , useParams , useNavigate  , Link} from "react-router-dom"
import {useState , useEffect} from "react";

import useMarvelInfo from "../../services/request"

import '../pages/singleComic.scss';

import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppBanner from "../appBanner/AppBanner";

const SingleComicPage = () => {
    const [comic , setComic] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const {comicId} = useParams()
    const {getComic , loading , error , clearError} = useMarvelInfo()

    useEffect(() => {
        onRequest()
    },[comicId])

    const onRequest = () => {
        clearError()
        getComic(comicId).then(res => updateComic(res))
    }

    const updateComic = (comic) => {
        setComic(comic)
    }

    const content = !(loading || error || !comic) ? <ViewComponent comic={comic} /> : null
    const spinner = loading ? <Spinner /> : null
    const errorGif = error ? <Error /> : null;
    return (
        <>
            <AppBanner />
            {errorGif}
            {spinner}
            {content}
        </>
    )
}

    const ViewComponent = ({comic}) => {
        const {description , name , price , pageCount , language , thumbnail} = comic

        return (
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }
export default SingleComicPage;
