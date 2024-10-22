import React from "react";


import moment from "moment";

const Post = ({ post }) => {
  const formattedDate = moment(post.date).format("h:mm A • M/D/YYYY");

  return (
    <div className="post-card">
      <div className="post-header">
        <a href={`/profile/${post.username}`} className="post-username">
          @{post.username} - {post.party}
        </a>
        <span className="post-date">{formattedDate}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button>
          <span> Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
