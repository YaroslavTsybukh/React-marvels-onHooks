import {Link , useParams} from "react-router-dom";
import useMarvelInfo from "../../services/request"
import {useState , useEffect} from "react"
import {Helmet} from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent"


const SinglePage = ({Component , type}) => {
    const [info , setInfo] = useState({})
    const {getCharacter , getComic , process , setProcess} = useMarvelInfo()
    const {id} = useParams()

    useEffect(() => {
        onRequest(id)
    },[id])

    const onRequest = (idParam) => {

        switch(type){
            case "character" :
                getCharacter(idParam).then(res => updateState(res)).then(() => setProcess("confirmed"))
                break
            case "comic" :
                getComic(idParam).then(res => updateState(res)).then(() => setProcess("confirmed"))
                break
        }
    }

    const updateState = (content) => {
        setInfo(content)
    }

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
            {setContent(process , Component , info)}
        </>
    )
}

export default SinglePage