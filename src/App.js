import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { RecipeList } from "./components/Home/RecipeList";
import { CreateARecipe } from "./components/createForm/createNewRecipe";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { RecipePage } from "./components/RecipePage/RecipePage";
import { initialState } from "./initialState";
import "./styles.css";

export default function App() {
  const [recipes, setRecipes] = useState(initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/create">
            <CreateARecipe recipes={recipes} setRecipes={setRecipes} />
          </Route>

          <Route
            path={`/recipepage/:id`}
            render={(routeProps) => (
              <RecipePage
                {...routeProps}
                recipes={recipes}
                setRecipes={setRecipes}
              />
            )}
          />
          <Route exact path="/">
            <RecipeList recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
