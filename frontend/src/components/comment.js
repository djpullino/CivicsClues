import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const Comment = (props) => {
  const { comment, deleteComment, handleEditComment } = props;
  
  const handleDelete = () => {
    deleteComment(comment._id); // Call the delete function passed as a prop
  };

  const handleEdit = () => {
    handleEditComment(comment._id); // Redirect to edit page using the passed function
  };

  return (
    <Card
      body
      outline
      color="success"
      className="mx-1 my-2"
      style={{ width: "30rem" }}
    >
      <Card.Body>
        <Stack>
          <div>
            <textarea
              className="form-control"
              rows="4"
              value={comment.commentContent}
              readOnly
              style={{
                resize: "none",
                whiteSpace: "pre-line",
                overflowWrap: "break-word",
              }}
            />
          </div>
          <div>
            <Button
              variant="primary"
              className="mx-1 my-1"
              onClick={handleEdit} // Trigger edit action
            >
              Edit
            </Button>

            <Button
              variant="primary"
              className="mx-1 my-1"
              onClick={handleDelete} // Trigger delete action
            >
              Delete
            </Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Comment;
