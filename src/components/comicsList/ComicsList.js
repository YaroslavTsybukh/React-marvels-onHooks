import {useEffect, useState} from "react";
import {Link} from "react-router-dom"

import useMarvelInfo from "../../services/request"

import './comicsList.scss';
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const setContent = (process , Component , newItemsLoading) => {
    switch(process){
        case "waiting":
            return <Spinner />
        case "loading":
            return newItemsLoading ? <Component /> : <Spinner />
        case "confirmed":
            return <Component />
        case "error":
            return <Error />
        default:
            throw new Error("Unexpected process state ")
    }
}

const ComicsList = () => {

    const [offset , setOffset] = useState(331)
    const [comics , setComics] = useState([])
    const [newItemsLoading , setNewItemsLoading] = useState(false)
    const [endedComics , setEndedComics] = useState(false)

    const {getAllComics , process , setProcess} = useMarvelInfo()

    useEffect(() => {
        onRequest(offset , true)
    } , [])

    const onRequest = (offset , initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset).then(res => updateComics(res)).then(() => setProcess("confirmed"))
    }

    const updateComics = (comicsArray) => {
        let ended = false

        if(comicsArray.length < 8) {
            ended = true
        }
        setComics([...comics , ...comicsArray])
        setOffset(offset => offset + 8)
        setEndedComics(ended)
        setNewItemsLoading(false)
    }

    const renderLiItems = (comicsArray) => {
        return comicsArray.map(({id, name , price , thumbnail} , i) => {
            return (
                <li key={i}
                    className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {setContent(process , () => renderLiItems(comics) , newItemsLoading)}
            </ul>
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemsLoading}
                    style={{"display" : endedComics ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;