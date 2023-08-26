
export const saveTodos = (todos : TodoItemType[]):void=> {
  localStorage.setItem('myTODOs', JSON.stringify(todos));
}

export const getTodos = () : TodoItemType[] => {
  const todos = localStorage.getItem('myTODOs');
  return todos? JSON.parse(todos) : []
}
