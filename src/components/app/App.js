import AppHeader from "../appHeader/AppHeader";
import { CharactersPage, ComicsPage } from "../pages";
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
               </Routes>
            </main>
        </div>
    )
}

export default App;