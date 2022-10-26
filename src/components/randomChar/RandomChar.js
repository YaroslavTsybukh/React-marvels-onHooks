import {useState , useEffect} from "react"
import useMarvelInfo from "../../services/request";
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from "../../utils/setContent";

import './randomChar.scss';

const RandomChar = () => {
    const [char , setChar] = useState({})

    const {getCharacter , clearError , process , setProcess} = useMarvelInfo()

    useEffect(() => {
        updateChar()
    },[])

    const charInfo = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const randomNumber = Math.floor(Math.random() * (1011175 - 1011334) + 1011334)
        getCharacter(randomNumber).then(res => charInfo(res)).then(() => setProcess("confirmed"))
    }

    return (
        <div className="randomchar">

            {setContent(process , RandomCharBlock , char)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;

const RandomCharBlock = ({data}) => {
    const {name , description , homepage , thumbnail , wiki } = data

    let imageStyle = {"objectFit" : "cover"}

    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
         imageStyle = {"objectFit" : "contain"}
    }

    return(
        <div className="randomchar__block">
             <img src={thumbnail} alt="Random character" className="randomchar__img" style={imageStyle}/>
             <div className="randomchar__info">
                 <p className="randomchar__name">{name}</p>
                 <p className="randomchar__descr">
                     {description}
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
    )
}