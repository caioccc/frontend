"use client"; // Enables client-side rendering for this component

// Import necessary hooks and types from React
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

// Import custom UI components from the UI directory
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { getTasks, searchTasks, updateTask, deleteTask } from "@/services/task";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getUsers } from "@/services/user";
import { createSharedTask } from "@/services/sharedTask";

// Define a TypeScript interface for task data
interface Task {
  id: number;
  name: string;
  description: string;
  category: string;
  user: number;
  status: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nextPageUrl, setNextPage] = useState("");
  const [previousPageUrl, setPreviousPage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    setLoadingSearch(true);
    getTasks(page).then((response) => {
      setTasks(response.data.results);
      setTotalItems(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao buscar tarefas!",
        description: (
          <>
            <p>Erro ao buscar tarefas!</p>
          </>
        ),
      });
      setLoadingSearch(false);
    });

    getUsers().then((response) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const users = response.data.filter((u) => u.id !== user.id);
      setUsers(users);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao buscar usuários!",
        description: (
          <>
            <p>Erro ao buscar usuários!</p>
          </>
        ),
      });
    });

  }, []);


  useEffect(() => {
    if (searchText.length > 0) {
      setLoadingSearch(true);
      //debouncing to search text 3 seconds
      const timer = setTimeout(() => {
        searchTasks(searchText).then((response) => {
          setTasks(response.data.results);
          setTotalItems(response.data.count);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
          setLoadingSearch(false);
        }).catch((error) => {
          setLoadingSearch(false);
          console.log(error);
          toast({
            title: "Erro ao buscar tarefas!",
            description: (
              <>
                <p>Erro ao buscar tarefas!</p>
              </>
            ),
          });
        });
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoadingSearch(true);
      const timer = setTimeout(() => {
        getTasks(page).then((response) => {
          setTasks(response.data.results);
          setTotalItems(response.data.count);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
          setLoadingSearch(false);
        }).catch((error) => {
          console.log(error);
          setLoadingSearch(false);
          toast({
            title: "Erro ao buscar tarefas!",
            description: (
              <>
                <p>Erro ao buscar tarefas!</p>
              </>
            ),
          });
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchText]);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoadingSearch(true);
    getTasks(newPage).then((response) => {
      setTasks(response.data.results);
      setTotalItems(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
    }).catch((error) => {
      console.log(error);
      setLoadingSearch(false);
      toast({
        title: "Erro ao buscar tarefas!",
        description: (
          <>
            <p>Erro ao buscar tarefas!</p>
          </>
        ),
      });
    });
  }

  const previousPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    setLoadingSearch(true);
    getTasks(newPage).then((response) => {
      setTasks(response.data.results);
      setTotalItems(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
    }).catch((error) => {
      console.log(error);
      setLoadingSearch(false);
      toast({
        title: "Erro ao buscar tarefas!",
        description: (
          <>
            <p>Erro ao buscar tarefas!</p>
          </>
        ),
      });
    });
  }

  const markTodoAsCompleted = (task) => {
    updateTask({ ...task, status: !task.status }).then((response) => {
      getTasks(page).then((response) => {
        setTasks(response.data.results);
        setTotalItems(response.data.count);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setLoadingSearch(false);
      }).catch((error) => {
        console.log(error);
        setLoadingSearch(false);
        toast({
          title: "Erro ao buscar tarefas!",
          description: (
            <>
              <p>Erro ao buscar tarefas!</p>
            </>
          ),
        });
      });
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao marcar tarefa como concluída!",
        description: (
          <>
            <p>Erro ao marcar tarefa como concluída!</p>
          </>
        ),
      });
    });
  }

  const doDeleteTask = (task) => {
    deleteTask(task).then((response) => {
      getTasks(page).then((response) => {
        setTasks(response.data.results);
        setTotalItems(response.data.count);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setLoadingSearch(false);
      }).catch((error) => {
        console.log(error);
        setLoadingSearch(false);
        toast({
          title: "Erro ao buscar tarefas!",
          description: (
            <>
              <p>Erro ao buscar tarefas!</p>
            </>
          ),
        });
      });
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao deletar tarefa!",
        description: (
          <>
            <p>Erro ao deletar tarefa!</p>
          </>
        ),
      });
    });
  }

  const shareTaskWithUser = (taskId, userId) => {
    const payload = {
      task: taskId,
      user: userId
    }
    createSharedTask(payload).then((response) => {
      console.log(response);
      toast({
        title: "Tarefa compartilhada com sucesso!"
      });
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao compartilhar tarefa!",
        description: (
          <>
            <p>Erro ao compartilhar tarefa!</p>
          </>
        ),
      });
    });
  }


  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {/* Center the todo list within the screen */}
      <div className="w-full">
        {/* Input for adding new tasks */}
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Buscar tarefa"
            value={searchText}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value) // Update new task input
            }
            className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        {/* List of tasks */}
        {
          loadingSearch ?
            (
              <div className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin text-4xl text-gray-800 dark:text-gray-200"></i>
              </div>
            )
            :
            (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
                  >
                    <div className="flex items-center">
                      {/* Checkbox to toggle task completion */}
                      <Checkbox
                        checked={task.status}
                        className="mr-2"
                        onCheckedChange={() => {
                          markTodoAsCompleted(task);
                        }}
                      />
                      <span
                        className={`whitespace-nowrap overflow-hidden text-xs !text-ellipsis flex-1 text-gray-800 dark:text-gray-200 ${task.status
                          ? "line-through text-gray-300 dark:text-gray-200"
                          : ""
                          }`}
                      >
                        {task.name.length > 30 ? task.name.substring(0, 30) + "..." : task.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Button
                        onClick={() => startEditingTask(task.id, task.text)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Button>
                      {/* Button to delete task */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline"><i className="fas fa-trash"></i> </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza que deseja remover esta tarefa?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Esta tarefa será removida permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => doDeleteTask(task)}
                            >Remover</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">
                            <i className="fas fa-share"></i>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Para quem deseja compartilhar esta tarefa?</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="flex flex-col gap-2">
                                <Select onValueChange={(value) => setSelectedUser(value)}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um usuário" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Usuários</SelectLabel>
                                      {
                                        users.map((user) => (
                                          <SelectItem
                                            key={user.id}
                                            value={user.id}
                                          >
                                            {user.username}
                                          </SelectItem>
                                        ))
                                      }
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => shareTaskWithUser(task.id, selectedUser)}
                            >Compartilhar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )
        }

      </div>
      {
        (previousPageUrl || nextPageUrl) && (
          <Pagination>
            <PaginationContent>
              {
                previousPageUrl && (
                  <PaginationItem>
                    <PaginationPrevious href="#"
                      onClick={previousPage}
                    />
                  </PaginationItem>
                )
              }

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {
                nextPageUrl && (
                  <PaginationItem>
                    <PaginationNext href="#"
                      onClick={nextPage}
                    />
                  </PaginationItem>
                )
              }
            </PaginationContent>
          </Pagination>
        )
      }
    </div>
  );
}

export default TodoList;