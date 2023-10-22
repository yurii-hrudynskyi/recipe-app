import React, { useState } from "react";
import { Comment } from "./Comment";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextareaAutosize, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  textArea: {
    border: "1px solid #9E9E9E",
    marginTop: "10px",
    color: "9E9E9E",
    width: "95%",
    "&:focus": {
      outline: "none",
      border: "1px solid #4caf50"
    }
  },
  addCommentButton: {
    backgroundColor: "#ffb74d",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ff9800"
    }
  },
  input: {
    marginTop: "10px",
    width: "90%"
  },
  comButContainer: {
    paddingBottom: "15px"
  },
  commentWrapper: {
    marginBottom: "15px",
    marginTop: "10px"
  },
  comment: {}
});

export const CommentSection = ({
  comments,
  setRecipes,
  recipes,
  id,
  setCommentsAreOpen
}) => {
  const classes = useStyles();

  const initComment = {
    text: "",
    name: "",
    imgLink: ""
  };
  const [newComment, setNewComment] = useState(initComment);

  return (
    <>
      <TextField
        value={newComment.name}
        label="Your Name"
        variant="outlined"
        className={classes.input}
        onChange={(event) => {
          setNewComment({ ...newComment, name: event.target.value });
          console.log(newComment);
        }}
      />

      <TextField
        value={newComment.imgLink}
        label="link to your picture"
        variant="outlined"
        className={classes.input}
        onChange={(event) => {
          setNewComment({ ...newComment, imgLink: event.target.value });
          console.log(newComment);
        }}
      />

      <TextareaAutosize
        rowsMin={5}
        value={newComment.text}
        className={classes.textArea}
        aria-label="comment textarea"
        placeholder="Please enter a comment"
        onChange={(event) => {
          setNewComment({ ...newComment, text: event.target.value });
          console.log(newComment);
        }}
      />

      <Grid container className={classes.commentWrapper}>
        {comments.map((comment, index) => {
          return (
            <Grid item key={index} className={classes.comment}>
              <Comment
                recipeID={id}
                setRecipes={setRecipes}
                comments={comments}
                recipes={recipes}
                commentID={Math.random()}
                avatar={comment.avatar}
                text={comment.text}
                lastAndFirstName={comment.lastAndFirstName}
              />
            </Grid>
          );
        })}
      </Grid>

      <Grid
        container
        justify={"space-around"}
        className={classes.comButContainer}
      >
        <Grid item>
          <Button
            variant="contained"
            className={classes.addCommentButton}
            onClick={() => {
              const neededRecipe = recipes.find((recipe) => recipe.id === id); //recipes[id - 1]

              if (!newComment.text || !newComment.name) {
                return null;
              } else {
                const changedComment = [...neededRecipe.comments].concat([
                  {
                    id: Math.random(),
                    lastAndFirstName: newComment.name,
                    text: newComment.text,
                    avatar: newComment.imgLink
                    // "https://image.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"
                  }
                ]);
                neededRecipe.comments = changedComment;
                setRecipes([...recipes]);
                setNewComment({
                  text: "",
                  name: "",
                  imgLink: ""
                });
              }
            }}
          >
            Add a Comment
          </Button>
        </Grid>

        <Grid item>
          <Button variant="outlined" onClick={() => setCommentsAreOpen(false)}>
            Discard
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
