import {useEffect, useState} from "react";
import useMarvelInfo from "../../services/request"

import './comicsList.scss';
import Spinner from "../spinner/Spinner";


const ComicsList = () => {

    const [offset , setOffset] = useState(110)
    const [comics , setComics] = useState([])
    const [newItemsLoading , setNewItemsLoading] = useState(false)
    const [endedComics , setEndedComics] = useState(false)

    const {loading , getAllComics} = useMarvelInfo()

    useEffect(() => {
        onRequest(offset , true)
    } , [])

    const onRequest = (offset , initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset).then(res => updateComics(res))
    }

    const updateComics = (comicsArray) => {
        let ended = false

        if(comicsArray.length < 8) {
            ended = true
        }

        setOffset(offset => offset + 8)
        setComics(comics => [...comics , ...comicsArray])
        setEndedComics(ended)
        setNewItemsLoading(false)
    }

    const renderLiItems = (comicsArray) => {
        return comicsArray.map(({name , price , thumbnail} , i) => {
            return (
                <li key={i}
                    className="comics__item">
                    <a href="#">
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>
            )
        })
    }

    const content = renderLiItems(comics)
    const spinner = loading && !newItemsLoading ? <Spinner/> : null

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {spinner}
                {content}
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