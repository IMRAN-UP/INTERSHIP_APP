import { useState } from "react";
import { useNavigate } from "react-router-dom" ;
import { Nav_bar , Poster_container , Adversting_container , Offers_container , Comments_container , Comment_form , Footer } from '../components/index' ;
import { set } from "react-hook-form";
function home() {
    const navigate = useNavigate() ;
    const [ addComment , setAddComment ] = useState(false) ;
    const handleCommentAdd = () => {
            setAddComment(!addComment) ;
    }
    return (
        <div className='home-page-container'>
            <Nav_bar situation={false}/>
            <Poster_container />
            <Adversting_container />
            <Offers_container />
            <Comments_container  handleCommentAdd={handleCommentAdd} />
            { addComment && <Comment_form handleCommentAdd={handleCommentAdd} /> }
            <Footer />
        </div>
    )
}

export default home
