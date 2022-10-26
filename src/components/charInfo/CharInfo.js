import {useState , useEffect} from "react"
import {useNavigate} from "react-router-dom"

import './charInfo.scss';

import useMarvelInfo from "../../services/request"
import setContent from "../../utils/setContent";

const CharInfo = ({charInfo}) => {
    const [char , setChar] = useState(null)

    const {getCharacter , process , setProcess} = useMarvelInfo()
    const navigate = useNavigate()

    useEffect(() => {
        getCharInfo()
    },[charInfo])

    const updateCharInfo = (char) => {
        setChar(char)
    }

    const getCharInfo = () => {
        if(!charInfo) return
        getCharacter(charInfo).then(res => updateCharInfo(res)).then(() => setProcess("confirmed"))
    }

    const navigateComic = (url) => {
        navigate(url.slice(35))
    }

    return (
        <div className="char__info">
            {setContent(process , ViewChar , char , navigateComic)}
        </div>
    )
}

export default CharInfo;

const ViewChar = ({data , navigate}) => {
    const {id , name , description , homepage , thumbnail , wiki , comics} = data

    let objectFit = {"objectFit" : "cover"}

    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        objectFit = {"objectFit" : "contain"}
    }

    return(
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={objectFit}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">

                    { comics.length > 0 ? null : <li className="char__comics-item">There are no comics here</li>}

                    {
                        comics.map(({resourceURI , name} , i) => {
                            if(i > 9) return
                            return (
                                <li key={i}
                                    className="char__comics-item"
                                    onClick={() => navigate(resourceURI)}>
                                    {name}
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        )
    }