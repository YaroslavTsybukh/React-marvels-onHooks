import './randomChar.scss';
import {Component} from "react"
import MarvelInfo from "../../services/request";
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner";
import Error from "../error/Error"

class RandomChar extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        char: {},
        loading: true ,
        error: false
    }

    marvelInfo = new MarvelInfo()

    componentDidMount(){
        this.updateChar()
    }

    charInfo = (char) => {
        this.setState({char , loading:false})
    }

    loadingSpinner = () => {
        this.setState(({loading : true}))
    }

    errorShow = () => {
        this.setState({loading:false , error:true})
    }

    updateChar = () => {
        const randomNumber = Math.floor(Math.random() * (1011175 - 1011334) + 1011334)
        this.loadingSpinner()
        this.marvelInfo.getCharacter(randomNumber).then(res => this.charInfo(res)).catch(this.errorShow)
    }

    render() {
        const {char, loading , error} = this.state

        const errorGif = error ? <Error /> : null;
        const load = loading ? <Spinner /> : null;
        const content = (!loading && !error) ? <RandomCharBlock char={char}/> : null


        return (
            <div className="randomchar">
                {errorGif}
                {load}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;

const RandomCharBlock = ({char}) => {
    const {name , description , homepage , thumbnail , wiki } = char

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