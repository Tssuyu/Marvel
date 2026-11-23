import { NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = (props) => {

    const setActiveLinkStyle = (isActive) => {
        return ({
            color: isActive ? '#9F0013' : 'inherit'
        })
    }
    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                            to="/"
                            end
                            style={({ isActive }) => setActiveLinkStyle(isActive)}>
                                Characters
                        </NavLink>
                    </li>
                    /
                    <li><NavLink 
                            to="/comics"
                            end
                            style={({ isActive }) => setActiveLinkStyle(isActive)}>
                                Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;