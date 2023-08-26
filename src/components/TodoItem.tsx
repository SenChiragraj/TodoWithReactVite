/** @format */

import { Paper, Typography, Checkbox, Button, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
};
const TodoItem = ({ deleteHandler, completeHandler, todo }: PropsType) => {
  return (
    <Paper variant="elevation" sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography marginRight={"auto"} sx={{textDecoration : todo.isComplete ? "line-through" : ""}}>{todo.title}</Typography>
        <Checkbox onChange={() => completeHandler(todo.id)} />
        <Button sx={{ fontWeight: "600" }}>Edit</Button>
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
