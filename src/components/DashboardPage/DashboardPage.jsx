import { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function DashboardPage() {
  const { setAuth } = useContext(AuthContext);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState({ title: "", description: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // API client with auth header
  const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch Tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery("tasks", async () => {
    const { data } = await apiClient.get("/tasks");
    return data;
  });

  // Create Task Mutation
  const createTaskMutation = useMutation(
    async (newTask) => {
      const { data } = await apiClient.post("/tasks", newTask);
      return data;
    },
    {
      onSuccess: (newTask) => {
        queryClient.setQueryData("tasks", (oldTasks) => [...oldTasks, newTask]);
        setAuth(true);
        setNewTask({ title: "", description: "" });
      },
      onError: (error) => {
        console.error("Error creating task:", error.response.data);
      },
    }
  );

  // Update Task Mutation
  const updateTaskMutation = useMutation(
    async ({ id, updatedTask }) => {
      const { data } = await apiClient.put(`/tasks/${id}`, updatedTask);
      return data;
    },
    {
      onSuccess: (updatedTask) => {
        queryClient.setQueryData("tasks", (oldTasks) =>
          oldTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
        setEditingTask(null);
        setTaskToEdit({ title: "", description: "" });
        setOpenDialog(false);
      },
      onError: (error) => {
        console.error("Error updating task:", error.response.data);
      },
    }
  );

  // Delete Task Mutation
  const deleteTaskMutation = useMutation(
    async (id) => {
      await apiClient.delete(`/tasks/${id}`);
    },
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData("tasks", (oldTasks) =>
          oldTasks.filter((task) => task.id !== id)
        );
      },
      onError: (error) => {
        console.error("Error deleting task:", error.response.data);
      },
    }
  );

  // Handlers
  const handleCreate = () => {
    createTaskMutation.mutate(newTask);
  };

  const handleUpdate = () => {
    updateTaskMutation.mutate({ id: editingTask, updatedTask: taskToEdit });
  };

  const handleDelete = (id) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) return <Typography>Loading tasks...</Typography>;
  if (isError) return <Typography>Error loading tasks!</Typography>;

  return (
    <Container sx={{ py: 10, my: 10 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCreate}
        >
          Add Task
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Title</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  sx={{ textTransform: "uppercase", fontWeight: "600" }}
                >
                  {task.status}
                </TableCell>
                <TableCell sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingTask(task.id);
                      setTaskToEdit({
                        title: task.title,
                        description: task.description,
                      });
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={taskToEdit.title}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            value={taskToEdit.description}
            onChange={(e) =>
              setTaskToEdit({ ...taskToEdit, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DashboardPage;
