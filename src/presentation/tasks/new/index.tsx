import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import HomeBaseLayout from '@/components/Layout/_HomeBaseLayout'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent
} from "@/components/ui/tabs"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useToast } from '@/hooks/use-toast'
import { getAllCategories } from '@/services/category'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createTask } from '@/services/task'

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Nome deve ter no mínimo 3 caracteres",
    }).max(150, {
        message: "Nome deve ter no máximo 150 caracteres",
    }),
    category: z.string().optional()
})


const NewTaskForm: NextPage = () => {
    const { logout, user } = useAuth()

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            category: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload = {
            ...data,
            user: user?.id,
        }
        createTask(payload).then(() => {
            toast({
                title: "Tarefa criada",
                description: "Tarefa criada com sucesso",
                status: "success",
            })
            router.push('/tasks')
        }).catch((err) => {
            toast({
                title: "Erro ao criar tarefa",
                description: "Erro ao criar tarefa",
                status: "error",
            })
            console.error(err)
        });
    }

    useEffect(() => {
        getAllCategories().then((resp) => {
            setCategories(resp.data)
        }).catch((err) => {
            console.error(err)
            toast({
                title: "Erro ao buscar categorias",
                description: "Erro ao buscar categorias",
                status: "error",
            })
        })
    }, [])


    return (
        <HomeBaseLayout
            title="Todo List"
        >
            <div className='flex flex-col items-center justify-center h-full gap-4'>
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <Button
                        type="button"
                        className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
                        onClick={() => router.push('/tasks')}
                        disabled={isLoading}
                    >
                        <i className="fas fa-list"></i>
                        Ver Tarefas
                    </Button>
                    <Button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                        onClick={() => {
                            setIsLoading(true)
                            logout()
                        }}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Sair
                    </Button>
                </div>
                <div className='gap-4 flex w-full'>
                    <Tabs defaultValue="mytasks" className="w-full">
                        <TabsContent value="mytasks">
                            <Card>
                                <CardHeader>
                                    Adicionar nova tarefa
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-2/3 space-y-6 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nome</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Insira a nova tarefa" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Categoria</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione uma categoria (opcional)" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        categories.map((category) => (
                                                                            <SelectItem key={category.id} value={`${category.id}`}>
                                                                                {category.name}
                                                                            </SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit">Criar</Button>
                                            </form>
                                        </Form>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </HomeBaseLayout>

    )
}

export default NewTaskForm
