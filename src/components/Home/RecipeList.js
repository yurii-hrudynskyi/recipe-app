import React, { useState } from "react";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { Container, Grid } from "@material-ui/core";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { initialState } from "../../initialState";

export function RecipeList({ recipes, setRecipes }) {
  const selectSort = (value) => {
    console.log("recipes", recipes);
    setSort(value);
    setRecipes((prevState) =>
      prevState.sort((a, b) =>
        a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0
      )
    );
  };
  const [sort, setSort] = useState("By date");
  const [showVegan, setShowVegan] = useState(false);

  switch (sort) {
    case "By date":
      setRecipes((currentRecipes) => {
        return currentRecipes.sort((a, b) =>
          b.date > a.date ? 1 : a.date > b.date ? -1 : 0
        );
      });
      break;
    case "By time":
      setRecipes((currentRecipes) => {
        return currentRecipes.sort((a, b) =>
          b.time > a.time ? 1 : a.time > b.time ? -1 : 0
        );
      });
      break;
    case "By popularity":
      setRecipes((currentRecipes) => {
        return currentRecipes.sort((a, b) =>
          b.comments.length > a.comments.length
            ? 1
            : a.comments.length > b.comments.length
            ? -1
            : 0
        );
      });
      break;

    default:
      break;
  }

  return (
    <Container fixed>
      <div
        style={{
          border: "1px solid #3f51b5",
          maxWidth: "90%",
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "3%"
        }}
      >
        <FormControlLabel
          label="Show only vegan recipes"
          control={
            <Checkbox
              style={{ color: "green" }}
              color="primary"
              onChange={(e) => {
                setShowVegan(!e.target.checked);

                if (showVegan) {
                  setRecipes((prev) =>
                    prev.filter((recipe) => recipe.isVegan === true)
                  );
                } else {
                  setRecipes(initialState);
                }
              }}
            />
          }
        />

        <Select value={sort} variant="outlined" style={{ width: "35%" }}>
          <MenuItem
            value={"By date"}
            onClick={() => {
              selectSort("By date");
            }}
          >
            By date
          </MenuItem>
          <MenuItem
            value={"By time"}
            onClick={() => {
              selectSort("By time");
            }}
          >
            By time
          </MenuItem>
          <MenuItem
            value={"By popularity"}
            onClick={() => {
              selectSort("By popularity");
            }}
          >
            By popularity
          </MenuItem>
        </Select>
      </div>

      <Grid container spacing={2}>
        {recipes.map((recipe) => {
          return (
            <Grid item key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                date={recipe.date}
                img={recipe.img}
                title={recipe.title}
                descr={recipe.descr}
                ing={recipe.ing}
                time={recipe.time}
                isVegan={recipe.isVegan}
                comments={recipe.comments}
                setRecipes={setRecipes}
                recipes={recipes}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
