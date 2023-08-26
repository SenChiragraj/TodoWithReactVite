/** @format */

import { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [title, setTitle] = useState<string>("");

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };
  const completeHandler = (id: TodoItemType["id"]): void => {
    const changeTodo:TodoItemType[] = todos.map((i) => {
      if(i.id === id) i.isComplete = !i.isComplete;
      return i;
    });

    setTodos(changeTodo);
  };

  const submitHandler = (title: TodoItemType["title"]): void => {
    const newTodo: TodoItemType = {
      title: title,
      isComplete: false,
      id: String(Math.random() * 1000),
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const getCompletedTodo = ():number => {
    let count:number = 0;
    todos.forEach((i) => {
      if(i.isComplete) count++;
    })

    return count;
  }

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{flexDirection:"row", justifyContent: "space-between"}}>
          <Typography>Todo App</Typography>
          { todos.length > 0 &&
            <Typography>{todos.length-getCompletedTodo()} Pending</Typography>
          }
        </Toolbar>
      </AppBar>
      <Stack height={"75%"} direction={"column"} p={"1rem"} spacing={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
          /> // Note the parentheses instead of curly braces
        ))}
      </Stack>
      <TextField
        fullWidth
        label={"New Task"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if(title !== "" && e.key == 'Enter') submitHandler(title)
        }}
        />
      <Button
        fullWidth
        sx={{ margin: "1rem 0" }}
        variant="contained"
        onClick={() => submitHandler(title)}
        disabled= {title === ""}
      >
        ADD
      </Button>
    </Container>
  );
}

export default App;
