import './charInfo.scss';
import {Component} from "react"
import Spinner from "../spinner/Spinner"
import Skeleton from "../skeleton/Skeleton"
import MarvelInfo from "../../services/request"

class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: null,
            loading: false
        }
    }

    marvel = new MarvelInfo()

    componentDidMount(){
        this.getCharInfo()
    }

    componentDidUpdate(prevProps){
        if(prevProps.charInfo !== this.props.charInfo){
            this.getCharInfo()
        }
    }

    loadingInfo = () => {
        this.setState({loading:true})
    }

    updateCharInfo = (char) => {
        this.setState({char , loading:false})
    }

    getCharInfo = () => {
        const {charInfo} = this.props
        if(!charInfo) return
        this.loadingInfo()
        this.marvel.getCharacter(charInfo).then(res => this.updateCharInfo(res))
    }

    render() {
        const {char , loading} = this.state
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
}

export default CharInfo;

const ViewChar = ({charInfo}) => {

    const {name , description , homepage , thumbnail , wiki , comics} = charInfo
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