import './charInfo.scss';
import {useState , useEffect} from "react"
import Spinner from "../spinner/Spinner"
import Skeleton from "../skeleton/Skeleton"
import useMarvelInfo from "../../services/request"

const CharInfo = ({charInfo}) => {

    const [char , setChar] = useState(null)

    const {loading , getCharacter} = useMarvelInfo()

    useEffect(() => {
        getCharInfo()
    },[charInfo])

    const updateCharInfo = (char) => {
        setChar(char)
    }

    const getCharInfo = () => {
        if(!charInfo) return
        getCharacter(charInfo).then(res => updateCharInfo(res))
    }

    const spinner = loading ? <Spinner /> : null;
    const skeleton = loading || char ? null : <Skeleton />;
    const content = !loading && char ? <ViewChar charInfo={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {content}
        </div>
    )
}

export default CharInfo;

const ViewChar = ({charInfo}) => {

    const {name , description , homepage , thumbnail , wiki , comics} = charInfo
    let objectFit = {"objectFit" : "cover"}
    console.log(comics)
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
                        comics.map((item , i) => {
                            if(i > 9) return
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </>
        )
    }