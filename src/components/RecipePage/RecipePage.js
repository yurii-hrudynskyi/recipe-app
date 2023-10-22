import React, { useState } from "react";

import {
  Divider,
  Typography,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog
} from "@material-ui/core";
import { ChangeRecipe } from "./changeRecipe";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import EcoRoundedIcon from "@material-ui/icons/EcoRounded";
import { CommentSection } from "../RecipeCard/CommentSection";

export const RecipePage = ({ recipes, match: { params }, setRecipes }) => {
  const recipe = recipes.find((recipe) => recipe.id === +params.id);

  const { id, date, img, title, descr, ing, time, isVegan, comments } = recipe;
  const useStyles = makeStyles({
    card: {
      maxWidth: "600px",
      boxShadow: "3px 7px 7px -3px rgba(34, 60, 80, 0.2)"
    },
    cardContent: {
      margin: "0px",
      paddingTop: "0px"
    },
    leafIcon: {
      color: "#4caf50"
    },

    icons: {
      marginTop: "20px",
      display: "flex",
      maxWidth: "100px"
    },
    buttonEdit: {
      marginBottom: "4px",
      backgroundColor: "#e57373",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f44336"
      }
    },
    buttonText: {
      color: "#fff"
    },
    ingHeader: {
      fontSize: "20px",
      paddingTop: "15px",
      paddingLeft: "15px",
      paddingRight: "15px"
    },
    ingHeaderItem: {
      padding: "0px",
      paddingRight: "10px",
      fontSize: "18px"
    },
    commentsContainer: {
      padding: "15px"
    },
    buttonShowComments: {
      color: "#fff",
      backgroundColor: "#9E9E9E",
      "&:hover": {
        backgroundColor: "#757575"
      },
      cursor: "pointer"
    }
  });
  const classes = useStyles();

  const [commentsAreOpen, setCommentsAreOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const formatedDate = (date) => {
    const dateString = new Date(date)
      .toString()
      .split(" ")
      .slice(0, 5)
      .join(" ");
    return dateString;
  };

  const formatTime = (time) => {
    let formated;
    if (time <= 59) {
      formated = `${parseInt(time)} min`;
    } else {
      formated = `${Math.trunc(time / 60)}h ${time % 60}min`;
    }

    return formated;
  };

  return (
    <>
      <Dialog open={isEditOpen}>
        <ChangeRecipe
          setIsEditOpen={setIsEditOpen}
          descr={descr}
          title={title}
          ing={ing}
          time={+time}
          img={img}
          setRecipes={setRecipes}
          recipes={recipes}
          recipe={recipe}
        />
      </Dialog>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={classes.card}>
          <CardMedia component={"img"} image={img} />

          <div style={{ display: "flex" }}>
            <Grid container justify={"space-between"}>
              <Grid item>
                <CardHeader title={title} />
              </Grid>

              <Grid item>
                <CardContent className={classes.cardContent}>
                  <Typography align="left">{descr}</Typography>
                </CardContent>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              alignContent={"center"}
              direction={"column"}
              className={classes.icons}
            >
              <Grid item>
                <AccessTimeRoundedIcon fontSize="small" />
                <span style={{ display: "block" }}>{formatTime(time)}</span>
              </Grid>

              {isVegan ? (
                <Grid item>
                  <EcoRoundedIcon fontSize="small" />
                  <span style={{ display: "block" }}>vegan</span>
                </Grid>
              ) : null}
            </Grid>
          </div>

          <Typography variant="caption" align="left">
            {formatedDate(date)}
          </Typography>

          <Divider />

          <Typography className={classes.ingHeader} variant={"h1"}>
            Ingridients:
          </Typography>

          <Grid container className={classes.commentsContainer}>
            {ing.map((ingridient, index) => {
              return (
                <Grid item key={index}>
                  <Grid container direction={"row"}>
                    <FiberManualRecordIcon
                      fontSize={"small"}
                      style={{ paddingTop: "3px" }}
                    />
                    <Grid item>
                      <Typography
                        className={classes.ingHeaderItem}
                        variant={"caption"}
                      >
                        {ingridient.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Divider />

          <CardActions>
            <Grid container justify={"space-around"}>
              <Grid item>
                <Button
                  className={classes.buttonEdit}
                  size={"large"}
                  variant={"contained"}
                  onClick={() => setIsEditOpen(true)}
                >
                  <Typography className={classes.buttonText} type={"caption"}>
                    Edit
                  </Typography>
                </Button>
              </Grid>

              <Grid item>
                <Button
                  className={classes.buttonShowComments}
                  size={"large"}
                  variant={"contained"}
                  onClick={() => setCommentsAreOpen(!commentsAreOpen)} //-------------------------------
                >
                  <Typography type={"caption"}>Show Comment</Typography>
                </Button>
              </Grid>
            </Grid>
          </CardActions>

          {commentsAreOpen ? (
            <CommentSection
              setCommentsAreOpen={setCommentsAreOpen}
              comments={comments}
              setRecipes={setRecipes}
              recipes={recipes}
              id={id}
            />
          ) : null}
        </Card>
      </div>
    </>
  );
};
