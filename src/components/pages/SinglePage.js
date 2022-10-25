import {Link , useParams} from "react-router-dom";
import useMarvelInfo from "../../services/request"
import {useState , useEffect} from "react"

import AppBanner from "../appBanner/AppBanner";
import Spinner from "../spinner/Spinner";
import {Helmet} from "react-helmet";

const SinglePage = ({Component , type}) => {
    const [info , setInfo] = useState({})
    const {getCharacter , getComic} = useMarvelInfo()
    const {id} = useParams()

    useEffect(() => {
        onRequest(id)
    },[id])

    const onRequest = (idParam) => {

        switch(type){
            case "character" :
                getCharacter(idParam).then(res => updateState(res))
                break
            case "comic" :
                getComic(idParam).then(res => updateState(res))
                break
        }
    }

    const updateState = (content) => {
        setInfo(content)
    }

    const content = info ? <Component info={info}/> : null
    const spinner = !info ? <Spinner/> : null

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Single page"
                />
                <title>Single page for {type}</title>
            </Helmet>
            <AppBanner/>
            {spinner}
            {content}
        </>
    )
}

export default SinglePage