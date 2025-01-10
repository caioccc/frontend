"use client"; // Enables client-side rendering for this component

// Import necessary hooks and types from React
import { ChangeEvent, useEffect, useState } from "react";

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
} from "@/components/ui/alert-dialog";

import { deleteSharedTask, getSharedTasks, searchSharedTasks, updateSharedTask } from "@/services/sharedTask";

// Define a TypeScript interface for task data

const SharedTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageUrl, setNextPage] = useState("");
  const [previousPageUrl, setPreviousPage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setLoadingSearch(true);
    getSharedTasks(page).then((response) => {
      setTasks(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
      setIsSearching(false);
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

  }, []);


  useEffect(() => {
    if (searchText.length > 0) {
      setLoadingSearch(true);
      //debouncing to search text 3 seconds
      const timer = setTimeout(() => {
        searchSharedTasks(searchText).then((response) => {
          setTasks(response.data.results);
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
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      if (isSearching) {
        setLoadingSearch(true);
        const timer = setTimeout(() => {
          getSharedTasks(page).then((response) => {
            setTasks(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
            setLoadingSearch(false);
            setIsSearching(false);
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
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [searchText]);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoadingSearch(true);
    getSharedTasks(newPage).then((response) => {
      setTasks(response.data.results);
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
    getSharedTasks(newPage).then((response) => {
      setTasks(response.data.results);
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
    const payload = {
      status: !task.status,
      id: task.id,
      task: task.task.id,
      user: task.user.id
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateSharedTask(payload).then((response) => {
      getSharedTasks(page).then((response) => {
        setTasks(response.data.results);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteSharedTask(task).then((response) => {
      getSharedTasks(page).then((response) => {
        setTasks(response.data.results);
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

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {/* Center the todo list within the screen */}
      <div className="w-full">
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Buscar tarefa compartilhada"
            value={searchText}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => {
                setIsSearching(true);
                setSearchText(e.target.value);
              }
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
                        className={`flex items-center whitespace-nowrap overflow-hidden text-xs !text-ellipsis flex-1 gap-2 text-gray-800 dark:text-gray-200 ${task.status
                          ? "line-through text-gray-300 dark:text-gray-200"
                          : ""
                          }`}
                      >
                        {task.task.name.length > 30 ? task.task.name.substring(0, 30) + "..." : task.task.name}
                      </span>
                    </div>
                    <div className="flex items-center">
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

export default SharedTaskList;