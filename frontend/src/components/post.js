import React from "react";
import moment from "moment";

const Post = ({ post }) => {
  const formattedDate = moment(post.date).format("h:mm A • M/D/YYYY");

  return (
    <div className="mb-4 p-4 text-[#301952] max-w-lg">
      <div className="flex justify-between items-center mb-2">
       <div className="text-lg font-semibold text-[#301952]">
          @{post.username} - Currently {post.party}
        </div>
        
      </div>
      <span className="text-sm text-gray-600">{formattedDate}</span>

      <div className="post-content mb-4">
        <p className="text-lg break-words">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
