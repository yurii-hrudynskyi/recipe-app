import React, { useState, useRef } from "react";
import {
  MenuItem,
  Container,
  Checkbox,
  Select,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Collapse
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useForm, Controller } from "react-hook-form";
import { withStyles } from "@material-ui/styles";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./ValidationSchema";

export const CreateARecipe = ({ recipes, setRecipes }) => {
  const [id, setId] = useState(recipes.length + 1);
  const [ingridient, setIngridient] = useState({
    name: "",
    amount: "",
    unit: ""
  });
  const [ingridients, setIngridients] = useState([]);
  const [noIngr, setNoIng] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [selectValue, setSeletcValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const [newRecipe, setNewRecipe] = useState({
    id: "",
    img: "",
    title: "",
    descr: "",
    ing: [],
    time: "",
    isVegan: false,
    comments: []
  });

  const GreenCheckbox = withStyles({
    root: {
      color: "grey",
      "&$checked": {
        color: "green"
      }
    },
    checked: {}
  })((props) => {
    return (
      <Checkbox color="default" label="This is a vegan recipe" {...props} />
    );
  });

  const titleRef = useRef(null);
  const timingRef = useRef(null);
  const descrRef = useRef(null);
  const imgRef = useRef(null);

  const reset = () => {
    setIngridients([]);
    titleRef.current.value = "";
    timingRef.current.value = "";
    descrRef.current.value = "";
    imgRef.current.value = "";
  };

  const onSubmit = (data) => {
    if (!ingridients.length) {
      setNoIng(true);
      return;
    } else {
      setNoIng(false);
      setId((prevState) => prevState + 1);
      setRecipes(() => [
        ...recipes,
        { id: id, ...data, date: Date.now(), ing: ingridients, comments: [] }
      ]);
      console.log("Recipes from Submit", recipes);
      reset();
      setSuccessAdd(true);
      setTimeout(() => setSuccessAdd(false), 3000);
    }
  };

  return (
    <>
      <h1>Here you can add a new recipe</h1>

      <Collapse in={successAdd}>
        <Alert severity="success" style={{ margin: "10px 0px" }}>
          You have successfully added a new recipe. Congrats!
        </Alert>
      </Collapse>

      <Container
        container="main"
        maxWidth="md"
        style={{ marginBottom: "20px" }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            id="title"
            type="text"
            label="Title"
            name="title"
            inputRef={titleRef}
            // autoFocus
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
              <Input
                {...register("name")}
                id="name-of-ingridient"
                type="text"
                label="Name"
                name="name"
                value={ingridient.name}
                onChange={(e) => {
                  setIngridient({ ...ingridient, name: e.target.value });
                }}
              />

              <Input
                {...register("amount")}
                id="amount"
                type="number"
                label="Amount"
                name="amount"
                value={ingridient.amount}
                onChange={(e) => {
                  setIngridient({ ...ingridient, amount: e.target.value });
                }}
              />

              <Select
                name="units"
                variant="outlined"
                style={{ flexGrow: 1 }}
                onChange={(e) => {
                  setSeletcValue(e.target.value);
                  setIngridient({ ...ingridient, unit: e.target.value });
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

            <Container>
              <Collapse in={ingridients.length}>
                <List component="nav" aria-label="main mailbox folders">
                  <Grid container spacing={1} justify="center">
                    {ingridients.map((ingridient, index) => {
                      return (
                        <Grid sm={8} xs={12} md={4} key={index} item>
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
                              primary={
                                ingridient.amount + ` ${ingridient.unit}`
                              }
                            />
                            <Button
                              size="small"
                              color="secondary"
                              variant="outlined"
                              onClick={(e) => {
                                console.log(e.target.value);
                                const changedIngridients = ingridients
                                  .concat()
                                  .filter((ing) => ing.id !== ingridient.id);
                                setIngridients(changedIngridients);
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
              </Collapse>
            </Container>

            <Collapse in={noIngr}>
              <Alert severity="warning" style={{ margin: "10px 0px" }}>
                Please add at leat one ingridient!
              </Alert>
            </Collapse>

            <Container
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                disabled={ingridient.name && ingridient.amount ? false : true}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (noIngr) {
                    setNoIng(false);
                  }

                  setIngridients((prevState) => prevState.concat([ingridient]));
                  setIngridient({
                    id: Math.random(),
                    name: "",
                    amount: "",
                    unit: ""
                  });
                  setSeletcValue("");
                  setNewRecipe({ ...newRecipe, ing: ingridients });
                }}
              >
                Add Ingridient
              </Button>
            </Container>
          </Container>

          <Input
            {...register("time")}
            error={!!errors.time}
            helperText={errors.time?.message}
            id="time"
            type="number"
            label="Timing (min)"
            name="time"
            inputRef={timingRef}
          />

          <Input
            {...register("descr")}
            error={!!errors.descr}
            helperText={errors.descr?.message}
            fullWidth={true}
            name="descr"
            label="Please enter description here (up to 200 symbols)"
            multiline
            inputRef={descrRef}
          />

          <Input
            {...register("img")}
            error={!!errors.img}
            helperText={errors.img?.message}
            id="img"
            type="url"
            label="Image Link"
            name="img"
            placeholder="Please paste a link to a picture of your recipe"
            inputRef={imgRef}
          />

          <Controller
            name="isVegan"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <InputLabel>
                This recipe is vegan
                <GreenCheckbox
                  onChange={(e) => {
                    field.onChange(e.target.checked); // field.onChange змінює field.value e.target.checked(trun if checked false if not)
                  }}
                  checked={field.value}
                />
              </InputLabel>
            )}
          />

          <PrimaryButton type="submit">Add a new Recipe</PrimaryButton>
        </form>
      </Container>
    </>
  );
};
