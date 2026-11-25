import { Link } from "react-router-dom"
import ErrorMessage from "../errorMessage/ErrorMessage"
import './404.scss';

const Page404 = ({message}) => {
    return (
        <div className="page404">
            <ErrorMessage message={message}/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>Page doesn't exist</p>
            <Link to="/" className="page404__back" style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px'}}>Back to main page</Link>
        </div>
    )
}

export default Page404;