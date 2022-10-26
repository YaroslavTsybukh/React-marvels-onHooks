import {useState, useRef, useEffect, useMemo} from "react";
import PropTypes from "prop-types";

import useMarvelInfo from "../../services/request";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import './charList.scss';

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
            throw new Error("Unexpected process state")
    }
}

const CharList = ({charInfo}) => {

    const [char , setChar] = useState([])
    const [offset , setOffset] = useState(110)
    const [newItemsLoading , setNewItemsLoading] = useState(false)
    const [endedChar , setEndedChar] = useState(false)
    const {getAllCharacters , process , setProcess} = useMarvelInfo()

    useEffect( () => {
        onRequest(offset , true)
    } , [])

    const onRequest = (offset , initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset , "limit" , 9).then(res => {
            onLoadedChar(res)
        }).then(() => setProcess("confirmed"))
    }

    const onLoadedChar = (newCharacters) => {
        let ended = false

        if(newCharacters.length < 9){
            ended = true
        }
        setChar([...char , ...newCharacters])
        setOffset(offset => offset + 9)
        setNewItemsLoading(false)
        setEndedChar(ended)
    }

    const characterDataTransfer = (id) => {
        charInfo(id)
    }

    const charItems = useRef([])

    const onFocus = (index) => {
        charItems.current.forEach(item => {
            item.classList.remove("char__item_selected")
        })
        charItems.current[index].classList.add("char__item_selected")
    }

    const renderCharacterList = (char) => {
        return char.map(({id , name , thumbnail} , index) => {
            let cssStyleThumbnail = {"objectFit" : "cover"}

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                cssStyleThumbnail = {"objectFit": "contain"}
            }

            return (
                <li ref={el => charItems.current[index] = el }
                    key={id}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => {characterDataTransfer(id); onFocus(index)}}
                    onKeyDown={(e) => {
                        if(e.code === "Enter"){
                            characterDataTransfer(id);
                            onFocus(index)
                        }
                    }}>

                    <img src={thumbnail} alt="abyss" style={cssStyleThumbnail}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }

    const content = useMemo(() => {
        return setContent(process , () => renderCharacterList(char) , newItemsLoading)
    } , [process])

    return (
        <div className="char__list">
            <ul className="char__grid">
                {content}
            </ul>
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemsLoading}
                style={{display: endedChar ? "none" : "block"}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    charInfo : PropTypes.func.isRequired
}
export default CharList;