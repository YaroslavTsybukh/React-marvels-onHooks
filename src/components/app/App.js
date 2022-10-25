import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import {lazy , Suspense} from "react";

const Spinner = lazy(() => import("../spinner/Spinner"))
const NotFoundPage = lazy(() => import("../pages/404"))
const AppHeader = lazy(() => import("../appHeader/AppHeader"))
const MainPage = lazy(() => import("../pages/MainPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../pages/SingleComicLayout/SingleComicPage"))
const SingleCharPage = lazy(() => import("../pages/SingleCharLayout/SingleCharPage"))
const ViewSingleCharPage = lazy(() => import("../pages/SingleCharLayout/SingleCharPage"))
const ViewSingleComicPage = lazy(() => import("../pages/SingleComicLayout/SingleComicPage"))
const SinglePage = lazy(() => import("../pages/SinglePage"))


const App = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>} />
                            <Route path="/comics" element={<ComicsPage/>} />
                            <Route path="/comics/:id" element={<SinglePage Component={ViewSingleComicPage} type={"comic"}/>} />
                            <Route path="/character/:id" element={<SinglePage Component={ViewSingleCharPage} type={"character"}/>} />
                            <Route path="*" element={<NotFoundPage/>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;