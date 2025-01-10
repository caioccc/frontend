/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next'
import { useState } from 'react'

import HomeBaseLayout from '@/components/Layout/_HomeBaseLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

import { useToast } from "@/hooks/use-toast"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const FormSchema = z.object({
    username: z.string().min(5, {
        message: "Usuário deve ter no mínimo 5 caracteres",
    }).max(50, {
        message: "Usuário deve ter no máximo 50 caracteres",
    }),
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(6, {
        message: "Senha deve ter no mínimo 6 caracteres",
    }),
    confirm_password: z.string().min(6, {
        message: "Senha deve ter no mínimo 6 caracteres",
    })
}).refine(data => data.password === data.confirm_password, {
    message: "Senhas não conferem",
    path: ["confirm_password"]
}).refine(data => data.email !== data.username, {
    message: "Email não pode ser igual ao usuário",
    path: ["email"]
}).refine(data => data.username !== data.password, {
    message: "Senha não pode ser igual ao usuário",
    path: ["password"]
}).refine(data => data.username === data.username.toLowerCase(), {
    message: "Usuário deve ser tudo minúsculo",
    path: ["username"]
}).refine(data => /^[a-z0-9_]*$/.test(data.username), {
    message: "Usuário deve ser tudo minúsculo e não pode ter caracteres especiais",
}).refine(data => !data.username.includes(" "), {
    message: "Usuário não pode ter espaços",
    path: ["username"]
})



const RegisterContent: NextPage = () => {
    const { toast } = useToast()

    const { register } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        const payload = {
            ...data,
        }
        setIsLoading(true)
        register(payload).then((resp) => {
            setIsLoading(false)
            toast({
                title: "Usuário registrado com sucesso!",
                description: (
                    <>
                        <p>Seja bem-vindo ao nosso sistema!</p>
                    </>
                ),
            })
            router.push('/login')
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            toast({
                title: "Erro ao registrar usuário",
                description: "Erro ao registrar usuário",
                status: "error",
            })
        })

    }

    const goToLogin = () => {
        router.push('/login')
    }


    return (
        <HomeBaseLayout
            title="Registrar"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                    <div className='flex flex-col items-center justify-center h-full gap-4'>
                        <FormField
                            control={form.control}
                            name="username"
                            className="w-full"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            label="Usuário"
                                            placeholder="Usuário"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            label="Email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            label="Senha"
                                            placeholder="Senha"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input
                                            label="Confirmar Senha"
                                            placeholder="Confirmar Senha"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <Button
                            type="submit"
                            className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
                            disabled={isLoading}
                        >
                            {isLoading ?
                                (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Carregando...
                                    </>
                                )
                                :
                                (
                                    <>
                                        <i className="fas fa-user-plus"></i>
                                        Registrar
                                    </>
                                )}
                        </Button>

                        <Button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                            onClick={goToLogin}
                        >
                            <i className="fas fa-sign-in-alt"></i>
                            Ir para Login
                        </Button>
                    </div>

                </form>
            </Form>


        </HomeBaseLayout>

    )
}

export default RegisterContent
