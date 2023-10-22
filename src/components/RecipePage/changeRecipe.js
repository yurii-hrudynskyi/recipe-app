import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  List,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeValSchema } from "./changeValSchema";

export const ChangeRecipe = ({
  descr,
  title,
  ing,
  time,
  img,
  recipes,
  recipe,
  setRecipes,
  setIsEditOpen
}) => {
  const [newDescr, setNewDescr] = useState(descr);
  const [newTitle, setNewTitle] = useState(title);
  const [newIngrs, setNewIngrs] = useState(ing);
  const [newIng, setNewIng] = useState({
    id: Math.random(),
    name: "",
    amound: "",
    unit: ""
  });
  const [selectValue, setSelectValue] = useState("");
  const [newTime, setNewTime] = useState(time);
  const [newImg, setNewImg] = useState(img);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changeValSchema)
  });

  const onSubmit = (data) => {
    let result = {};

    const filter = (obj) => {
      for (key in obj) {
        if (typeof obj[key] !== "undefined") {
          result[key] = obj[key];
        }
      }
    };
    filter(data);
    console.log(result);
    console.log(newIngrs);

    const question = window.confirm(
      "Are you sure you want to change the recipe?"
    );

    if (question) {
      const copy = recipes.concat();
      copy[copy.findIndex((item) => item === recipe)] = {
        ...recipe,
        ...data,
        ing: newIngrs
      };
      setRecipes(copy);
      setIsEditOpen(false);
    } else {
      return;
    }
  };

  console.log("time", typeof time);

  let history = useHistory();

  return (
    <>
      <Container maxWidth={"xs"}>
        <Typography
          align="center"
          variant="h4"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            margin: "20px",
            color: "#e57373"
          }}
        >
          Change a recipe
        </Typography>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 10
          }}
        >
          <TextField
            {...register("descr")}
            style={{ marginBottom: 10 }}
            value={newDescr}
            onChange={(e) => setNewDescr(e.target.value)}
            variant="outlined"
            error={!!errors.descr}
            helperText={errors.descr?.message}
            fullWidth={true}
            name="descr"
            label="Please enter description here (up to 200 symbols)"
            multiline
          />
          <TextField
            {...register("title")}
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            label="Title"
          />

          <Container
            component="section"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}
            disableGutters
          >
            <InputLabel
              htmlFor="name-of-ingridient"
              style={{ marginTop: "10px" }}
            >
              Please enter ingridients
            </InputLabel>
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row"
              }}
              disableGutters
            >
              <TextField
                variant="outlined"
                id="name-of-ingridient"
                type="text"
                label="Name"
                name="name"
                value={newIng.name}
                onChange={(e) => {
                  setNewIng({ ...newIng, name: e.target.value });
                }}
              />

              <TextField
                variant="outlined"
                id="amount"
                type="number"
                label="Amount"
                name="amount"
                value={newIng.amount}
                onChange={(e) => {
                  setNewIng({ ...newIng, amount: e.target.value });
                }}
              />

              <Select
                name="units"
                variant="outlined"
                style={{ flexGrow: 1 }}
                onChange={(e) => {
                  setSelectValue(e.target.value);
                  setNewIng({ ...newIng, unit: e.target.value });
                }}
                value={selectValue}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"pcs"}>Pieces</MenuItem>
                <MenuItem value={"gm"}>Grams</MenuItem>
                <MenuItem value={"kg"}>Kilograms</MenuItem>
                <MenuItem value={"ml"}>Milliliters</MenuItem>
                <MenuItem value={"tsp"}>Teaspoon</MenuItem>
                <MenuItem value={"Tbsp"}>Tablespoon</MenuItem>
              </Select>
            </Container>
          </Container>

          <List component="nav" aria-label="main mailbox folders">
            <Grid container spacing={1} justify="center">
              {newIngrs.map((ingridient, index) => {
                return (
                  <Grid xs={12} key={index} item>
                    <ListItem divider dense>
                      <ListItemIcon style={{ width: "13px" }}>
                        <FiberManualRecordIcon
                          fontSize="small"
                          style={{ margin: "0px" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Name: " + ingridient.name}
                        style={{ fontWeight: 400, marginLeft: "30px" }}
                      />
                      <ListItemText
                        primary={ingridient.amount + ` ${ingridient.unit}`}
                      />
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={(e) => {
                          const changedIngridients = newIngrs
                            .concat()
                            .filter((ing) => ing.id !== ingridient.id);
                          setNewIngrs(changedIngridients);
                        }}
                      >
                        Delete
                      </Button>
                    </ListItem>
                  </Grid>
                );
              })}
            </Grid>
          </List>

          <Container
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              style={{ marginBottom: 10 }}
              disabled={newIng.name && newIng.amount ? false : true}
              variant="contained"
              color="primary"
              onClick={() => {
                setNewIngrs((prevState) => prevState.concat([newIng]));
                setNewIng({
                  id: Math.random(),
                  name: "",
                  amount: "",
                  unit: ""
                });
                setSelectValue("");
              }}
            >
              Add Ingridient
            </Button>
          </Container>

          <TextField
            {...register("time")}
            style={{ marginBottom: 15 }}
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            variant="outlined"
            error={!!errors.time}
            helperText={errors.time?.message}
            id="time"
            type="number"
            label="Timing (min)"
            name="time"
          />

          <TextField
            {...register("img")}
            value={newImg}
            onChange={(e) => setNewImg(e.target.value)}
            variant="outlined"
            error={!!errors.img}
            helperText={errors.img?.message}
            id="img"
            type="url"
            label="Image Link"
            name="img"
            placeholder="Please paste a link to a picture of your recipe"
          />

          <Controller
            name="isVegan"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <InputLabel>
                This recipe is vegan
                <Checkbox
                  style={{ color: "green" }}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  checked={field.value}
                />
              </InputLabel>
            )}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: 20
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Change
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffb74d", color: "#fff" }}
              type="button"
              onClick={() => setIsEditOpen(false)}
            >
              Discard
            </Button>
          </div>

          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#d32f2f" }}
            onClick={() => {
              const copy = recipes.concat();
              copy.splice(
                copy.findIndex((item) => item === recipe),
                1
              );
              const question = window.confirm(
                "Are you sure you want to delete this recipe?"
              );

              if (question) {
                setRecipes(copy);
                history.push("/");
              } else {
                return;
              }
            }}
          >
            Delete this recipe
          </Button>
        </form>
      </Container>
    </>
  );
};
