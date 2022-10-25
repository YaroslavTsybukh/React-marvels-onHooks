import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearchForm/CharSearchForm";
import decoration from "../../resources/img/vision.png";

import {useState} from "react";

const MainPage = () => {
    const [selectId , setSelectedId] = useState(null)

    const onSelectId = (id) => {
        setSelectedId(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList charInfo={onSelectId}/>
                    <div>
                        <ErrorBoundary>
                            <CharInfo charInfo={selectId}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearch/>
                        </ErrorBoundary>
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage
