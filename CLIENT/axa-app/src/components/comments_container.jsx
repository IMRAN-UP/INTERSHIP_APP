import { useState, useEffect, useRef } from 'react';
import { left_icon, right_icon , add_icon  , star_icon } from '../assets/icons';

function CommentsContainer({handleCommentAdd}) {
  const [comments, setComments] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/comments/findComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="comments-container">
      <div className='comments-wrapper'>
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <img src={left_icon} alt="" />
        </button>
        <div className="comments-list" ref={containerRef}>
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
              <div className='stars-container'>
                {
                  Array.from({ length: comment.stars }, (_, index) => (
                    <img src={star_icon} alt="star icon svg" />
                  ))
                }
              </div>
            </div>
          ))}
          <button className="add-comment-btn">
            <img src={add_icon} alt="add btn svg" onClick={handleCommentAdd} />
          </button>
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <img src={right_icon} alt="" />
        </button>
      </div>
    </section>
  );
}

export default CommentsContainer;
