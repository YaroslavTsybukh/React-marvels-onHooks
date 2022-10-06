import './charList.scss';

import {useState , useRef , useEffect} from "react";
import PropTypes from "prop-types";

import MarvelInfo from "../../services/request";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {

    const [char , setChar] = useState([])
    const [loading , setLoading] = useState(true)
    const [offset , setOffset] = useState(110)
    const [newItems , setNewItems] = useState(false)
    const [endedChar , setEndedChar] = useState(false)

    const marvelInfo = new MarvelInfo()

    useEffect( () => {
        onRequest()
    } , [])

    const onRequest = (offset) => {
        onLoadingCharacters()
        marvelInfo.getAllCharacters(offset).then(res => {
            onLoadedChar(res)
        })
    }

    const onLoadingCharacters = () => {
        setLoading(true)
    }

    const onLoadedChar = (newCharacters) => {
        let ended = false

        if(newCharacters.length < 9){
            ended = true
        }
        setChar(char => [...char , ...newCharacters])
        setLoading(false)
        setOffset(offset => offset + 9)
        setNewItems(false)
        setEndedChar(ended)
    }

    const characterDataTransfer = (id) => {
        props.charInfo(id)
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
                <li key={id}
                    ref={el => charItems.current[index] = el }
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

    const character = renderCharacterList(char)
    const loadingInfo = loading ? <Spinner /> : null
    const content = !loading ? character : null

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadingInfo}
                {content}
            </ul>
            <button
                onClick={() => onRequest(offset)}
                disabled={newItems}
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