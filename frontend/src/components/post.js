import React from "react";
import moment from "moment";

const Post = ({ post }) => {
  const formattedDate = moment(post.date).format("h:mm A • M/D/YYYY");

  return (
    <div className="mb-4 p-4 text-[#301952] max-w-lg">
      <div className="flex justify-center items-center mb-2">
        <div className="text-lg font-semibold text-[#301952]">
          @{post.username}
        </div>
      </div>
      <span className="pb-6 text-md text-gray-600 mb-8">
        <span className="font-bold text-[#301952]">{post.party}</span> at {formattedDate}
      </span> 
      <div className="post-content mb-8">
        <p className="text-xl break-words">{post.content}</p>
      </div>
    </div>
  );
  
  
  
};

export default Post;
