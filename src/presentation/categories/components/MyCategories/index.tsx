/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // Enables client-side rendering for this component

// Import necessary hooks and types from React
import { ChangeEvent, useEffect, useState } from "react";

// Import custom UI components from the UI directory
import { Button } from "@/components/ui/button";
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

import { deleteCategory, getCategories, searchCategories } from "@/services/category";
import { useRouter } from "next/router";

// Define a TypeScript interface for task data
interface Task {
  id: number;
  name: string;
  description: string;
  category: string;
  user: number;
  status: boolean;
}

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageUrl, setNextPage] = useState("");
  const [previousPageUrl, setPreviousPage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    setLoadingSearch(true);
    getCategories(page).then((response) => {
      setCategories(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
      setIsSearching(false);
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao buscar categorias!",
        description: (
          <>
            <p>Erro ao buscar categorias!</p>
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
        searchCategories(searchText).then((response) => {
          setCategories(response.data.results);
          setNextPage(response.data.next);
          setPreviousPage(response.data.previous);
          setLoadingSearch(false);
        }).catch((error) => {
          setLoadingSearch(false);
          console.log(error);
          toast({
            title: "Erro ao buscar categorias!",
            description: (
              <>
                <p>Erro ao buscar categorias!</p>
              </>
            ),
          });
        });
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      if (isSearching) {
        setLoadingSearch(true);
        const timer = setTimeout(() => {
          getCategories(page).then((response) => {
            setCategories(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
            setLoadingSearch(false);
            setIsSearching(false);
          }).catch((error) => {
            console.log(error);
            setLoadingSearch(false);
            toast({
              title: "Erro ao buscar categorias!",
              description: (
                <>
                  <p>Erro ao buscar categorias!</p>
                </>
              ),
            });
          });
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [searchText]);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoadingSearch(true);
    getCategories(newPage).then((response) => {
      setCategories(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
    }).catch((error) => {
      console.log(error);
      setLoadingSearch(false);
      toast({
        title: "Erro ao buscar categorias!",
        description: (
          <>
            <p>Erro ao buscar categorias!</p>
          </>
        ),
      });
    });
  }

  const previousPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    setLoadingSearch(true);
    getCategories(newPage).then((response) => {
      setCategories(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setLoadingSearch(false);
    }).catch((error) => {
      console.log(error);
      setLoadingSearch(false);
      toast({
        title: "Erro ao buscar categorias!",
        description: (
          <>
            <p>Erro ao buscar categorias!</p>
          </>
        ),
      });
    });
  }


  const doDeleteCategory = (category) => {
    deleteCategory(category).then((response) => {
      getCategories(page).then((response) => {
        setCategories(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
        setLoadingSearch(false);
      }).catch((error) => {
        console.log(error);
        setLoadingSearch(false);
        toast({
          title: "Erro ao buscar categorias!",
          description: (
            <>
              <p>Erro ao buscar categorias!</p>
            </>
          ),
        });
      });
    }).catch((error) => {
      console.log(error);
      toast({
        title: "Erro ao remover categoria!",
        description: (
          <>
            <p>Erro ao remover categoria!</p>
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
            placeholder="Buscar categoria"
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
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
                  >
                    <div className="flex items-center">
                      <span
                        className={`whitespace-nowrap overflow-hidden text-xs !text-ellipsis flex-1 text-gray-800 dark:text-gray-200`}
                      >
                        {category.name.length > 30 ? category.name.substring(0, 30) + "..." : category.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Button
                        onClick={() => {
                          router.push(`/categories/edit/${category.id}`);
                        }}
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
                            <AlertDialogTitle>Tem certeza que deseja remover esta categoria?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Esta tarefa será removida permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => doDeleteCategory(category)}
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
                      onClick={() => {
                        previousPage();
                      }}
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
                      onClick={() => {
                        nextPage();
                      }}
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

export default CategoriesList;