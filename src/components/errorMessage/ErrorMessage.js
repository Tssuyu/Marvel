import img from './error.gif';

const ErrorMessage = ({ message }) => {
    return (
        <>
            <img style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}} alt='Error' src={img}/>
            <p style={{
                    textAlign: 'center',
                    color: '#9f0013',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '30px auto'
                }}>
                    {message}
            </p>
        </>

    )
}

export default ErrorMessage;