/** @format */

import { Paper, Typography, Checkbox, Button, Stack, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (id: TodoItemType["id"], title: TodoItemType['title']) => void;
};
const TodoItem = ({ deleteHandler, completeHandler, editHandler, todo }: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<TodoItemType['title']>(todo.title);

  const submitHandler = ():void => {
    setEditActive(false);
    editHandler(todo.id, editedTitle);
    setEditActive(false);
  }

  return (
    <Paper variant="elevation" sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {
          editActive ? <TextField
          label={"New Task"}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={(e) => {
            if(editedTitle !== "" && e.key == 'Enter') submitHandler();
          }}
          />
          : <Typography marginRight={"auto"} sx={{textDecoration : todo.isComplete ? "line-through" : ""}}>{todo.title}</Typography>
        }
        <Checkbox onChange={() => completeHandler(todo.id)} />
        {
          editActive ? <Button sx={{ fontWeight: "600" }} onClick={() => submitHandler()}>Done</Button> : <Button sx={{ fontWeight: "600" }} onClick={() => setEditActive(true)}>Edit</Button>
        }
        <Button
          sx={{ opacity: "60%", color: "red" }}
          onClick={() => deleteHandler(todo.id)}
        >
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
