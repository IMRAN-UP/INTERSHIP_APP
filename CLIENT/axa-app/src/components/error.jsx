
const register_success = ({message}) => {
    return (
        <div className="register-alert error-register-alert" role="alert">
            <p className="mb-0"> {message} </p>
        </div>
    )
}

export default register_success;
