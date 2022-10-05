import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {Component} from "react";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectId: null
    }

    onSelectId = (id) => {
        this.setState({selectId:id})
    }

    render() {
        const {selectId} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList charInfo={this.onSelectId}/>
                            <CharInfo charInfo={selectId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;