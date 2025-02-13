import { useState, useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [form, setform] = useState({ task: "", isCompleted: false });
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    function fetchtodos() {
      if (localStorage.getItem("todo")) {
        setTodos(JSON.parse(localStorage.getItem("todo")));
      }
    }
    fetchtodos();
  }, []);

  function handleform(event) {
    setform({
      ...form,
      [event.target.name]: event.target.value,
    });
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newtodo = { ...form, myid: uuidv4() };
      const updatedtodos = [...Todos, newtodo];
      setTodos(updatedtodos);
      localStorage.setItem("todo", JSON.stringify(updatedtodos));
      setform({
        ...form,
        task: "",
      });
    }
  }
  function savetodo() {
    const newtodo = { ...form, myid: uuidv4() };
    if (newtodo.task) {
      const updatedtodos = [...Todos, newtodo];
      setTodos(updatedtodos);
      localStorage.setItem("todo", JSON.stringify(updatedtodos));
      setform({
        ...form,
        task: "",
      });
      toast.info("Your todo is saved", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warn("Please add some value", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  function deletetodo(myid) {
    const deletedarray = Todos.filter((todo) => todo.myid !== myid);
    setTodos(deletedarray);
    localStorage.setItem("todo", JSON.stringify(deletedarray));
    toast.error("Todo is deleted", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  function markasdone(completeid) {
    const donetodo = Todos.map((todo) => {
      if (todo.myid === completeid) {
        if (todo.isCompleted === false) {
          todo.isCompleted = true;
          toast.success("Well Done", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          todo.isCompleted = false;
          toast("Something Left", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
      return todo;
    });
    setTodos(donetodo);
    localStorage.setItem("todo", JSON.stringify(donetodo));
  }
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Typography variant="h2" gutterBottom>
        Neeraj's Todos
      </Typography>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextField
          onChange={handleform}
          onKeyDown={handleKeyDown}
          name="task"
          value={form.task}
          id="outlined-basic"
          variant="outlined"
          size="small"
          label="My Task"
        />
        <Button onClick={savetodo} variant="outlined" size="medium">
          Add
        </Button>
      </Box>
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          gap: "0",
          alignItems: "center",
        }}
      >
        {Todos.length == 0 && (
          <Box
            sx={(theme) => ({
              p: 1,
              color: "grey.800",
              fontSize: "0.575rem",
            })}
          >
            <Typography variant="h4" component="h2">
              Please Add new tasks
            </Typography>
          </Box>
        )}
        {Todos.length != 0 &&
          Todos.map((todo) => {
            return (
              <List
                key={todo.myid}
                dense
                sx={{
                  width: "100%",
                  maxWidth: "768px",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem
                  secondaryAction={
                    <>
                      <Checkbox
                        edge="end"
                        onChange={() => markasdone(todo.myid)}
                        checked={todo.isCompleted ? "checked" : ""}
                        inputProps=""
                      />
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon
                          fontSize="inherit"
                          onClick={() => deletetodo(todo.myid)}
                        />
                      </IconButton>
                    </>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{
                        textDecoration: todo.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.task}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            );
          })}
      </Box>
    </>
  );
}

export default App;
