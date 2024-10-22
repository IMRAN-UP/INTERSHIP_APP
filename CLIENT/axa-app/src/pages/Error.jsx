import { useNavigate } from "react-router-dom";
function Error() {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault(); 
    navigate('/');
  }

  return (
    <div className="error-404-container">
        <h1>Error 404</h1>
        <p>The page you're looking for does not exist.</p>
        <a href="" onClick={handleClick} >Back to Home</a>
    </div>
  )
}

export default Error
