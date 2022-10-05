import './charList.scss';

import React , {Component} from "react";
import PropTypes from "prop-types";

import MarvelInfo from "../../services/request";
import Spinner from "../spinner/Spinner";

class CharList extends Component{

    constructor(props){
        super(props)
        this.myref = React.createRef()
    }

    state = {
        char : [],
        loading: true,
        offset: 110,
        newItems : false,
        endedChar : false
    }

    marvelInfo = new MarvelInfo()

    componentDidMount() {
        this.onRequest()
    }

    onRequest(offset) {
        this.onLoadingCharacters()
        this.marvelInfo.getAllCharacters(offset).then(res => {
            this.onLoadedChar(res)
        })
    }

    onLoadingCharacters = () => {
        this.setState({
            newItems: true
        })
    }

    onLoadedChar = (newCharacters) => {
        let ended = false

        if(newCharacters.length < 9){
            ended = true
        }

        this.setState(({char , offset}) => ({
            char: [...char , ...newCharacters],
            loading: false,
            offset: offset + 9,
            newItems: false,
            endedChar: ended
        }))
    }

    characterDataTransfer = (id) => {
        this.props.charInfo(id)
    }

    charItems = []

    setRef = (elem) => {
        this.charItems.push(elem)
    }

    onFocus = (index) => {
        this.charItems.forEach(item => {
            item.classList.remove("char__item_selected")
        })
        this.charItems[index].classList.add("char__item_selected")
    }

    renderCharacterList = (char) => {
        return char.map(({id , name , thumbnail} , index) => {
            let cssStyleThumbnail = {"objectFit" : "cover"}

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                cssStyleThumbnail = {"objectFit": "contain"}
            }

            return (
                <li key={id}
                    ref={this.setRef}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => {this.characterDataTransfer(id); this.onFocus(index)}}
                    onKeyDown={(e) => {
                        if(e.code === "Enter"){
                            this.characterDataTransfer(id);
                            this.onFocus(index)
                        }
                    }}>

                    <img src={thumbnail} alt="abyss" style={cssStyleThumbnail}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    }

    render(){
        const {char , loading , offset , newItems , endedChar} = this.state
        const character = this.renderCharacterList(char)
        const loadingInfo = loading ? <Spinner /> : null
        const content = !loading ? character : null

        return (
            <div ref={this.myref} className="char__list">
                <ul className="char__grid">
                    {loadingInfo}
                    {content}
                </ul>
                <button
                    onClick={() => this.onRequest(offset)}
                    disabled={newItems}
                    style={{display: endedChar ? "none" : "block"}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    charInfo : PropTypes.func.isRequired
}
export default CharList;