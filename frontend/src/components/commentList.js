import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommentList = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/getCommentById/${postId}`
                );
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                alert("Failed to load comments.");
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <div>
            <h2>Comments for Post {postId}</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <strong>{comment.username}</strong>: {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
