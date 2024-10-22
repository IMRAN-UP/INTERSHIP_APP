import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function CommentForm({ clientId, handleCommentAdd }) {

    const [stars, setStars] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try{
            const response = await fetch('http://localhost:5000/api/comments/createComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: clientId,
                    content: data.comment,
                    stars: stars,
                }),
            }) ;

            if ( !response.ok) {
                console.error('Error:', response.statusText);
                return;
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (

        <div className="comment-form-container">

            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="comment">Comment:</label>

                <textarea
                    id="comment"
                    {...register('comment' , {
                        required: true,
                    })}
                />

                <div className="star-rating">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <span

                            key={star}
                            onClick={() => setStars(star)}
                            style={{
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: stars >= star ? 'gold' : 'gray',
                            }}
                            {...register('star')}
                        >
                            &#9733;
                        </span>
                    ))}

                </div>

                <div className="btn-container">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCommentAdd}>Cancel</button>
                </div>

            </form>
        </div>
    );
}

export default CommentForm;
