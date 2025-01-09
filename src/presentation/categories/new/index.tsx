import type { NextPage } from 'next'
import { useState } from 'react'

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
import { createCategory } from '@/services/category'

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Nome deve ter no mínimo 3 caracteres",
    }),
})


const NewCategoryForm: NextPage = () => {
    const { logout, user } = useAuth()

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        const payload = {
            ...data,
            user: user?.id
        }
        createCategory(payload).then((resp) => {
            toast({
                title: "Categoria criada",
                description: "Categoria criada com sucesso",
                status: "success",
            })
            console.log(resp)
            router.push('/categories')
        }).catch((err) => {
            toast({
                title: "Erro ao criar categoria",
                description: "Erro ao criar categoria",
                status: "error",
            })
            console.error(err)
        });
    }

    return (
        <HomeBaseLayout
            title="Todo List"
        >
            <div className='flex flex-col items-center justify-center h-full gap-4'>
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <Button
                        type="button"
                        className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
                        onClick={() => router.push('/categories')}
                        disabled={isLoading}
                    >
                        <i className="fas fa-list"></i>
                        Ver Categorias
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
                                    Adicionar nova categoria
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
                                                                <Input placeholder="Insira o nome da nova categoria" {...field} />
                                                            </FormControl>
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

export default NewCategoryForm
