import AppHeader from "../appHeader/AppHeader";
import { CharactersPage, ComicsPage, Page404, SingleComicPage} from "../pages";
import { Routes, Route } from 'react-router-dom';


const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
            <Routes>
                    <Route
                        path="/"    
                        element={<CharactersPage/>}
                    />
                    <Route
                        path="/comics"    
                        element={<ComicsPage/>}
                    />
                    <Route
                        path="/comics/:id"
                        element={<SingleComicPage/>}
                    />
                    <Route
                        path="*"
                        element={<Page404/>}
                    />
            </Routes>
            </main>
        </div>
    )
}

export default App;