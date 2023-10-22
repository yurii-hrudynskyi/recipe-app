import React from "react";
import {
  IconButton,
  Divider,
  Typography,
  Grid,
  Avatar
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

export const Comment = ({
  text,
  lastAndFirstName,
  avatar,
  comments,
  commentID,
  recipeID,
  setRecipes,
  recipes
}) => {
  const filtedComments = (commentID) => {
    const copiedComment = comments.concat();
    copiedComment.splice(
      copiedComment.findIndex((comment) => comment.id === commentID),
      1
    );
    const changedRecipes = recipes.concat();

    changedRecipes[
      changedRecipes.findIndex((recipe) => recipe.id === recipeID)
    ].comments = [...copiedComment];

    setRecipes(changedRecipes);
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <Avatar src={avatar} />
        </Grid>
        <Grid item>
          <Typography variant="caption">{lastAndFirstName}</Typography>
          <Typography variant="subtitle2">{text}</Typography>

          <IconButton
            size={"small"}
            component={"span"}
            onClick={() => {
              filtedComments(commentID);
            }}
          >
            <DeleteOutlineOutlinedIcon />
            Delete
          </IconButton>
        </Grid>
      </Grid>

      <Divider />
    </>
  );
};
