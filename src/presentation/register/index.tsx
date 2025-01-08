import type { NextPage } from 'next'
import { useState } from 'react'

import HomeBaseLayout from '@/components/Layout/_HomeBaseLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

import { useToast } from "@/hooks/use-toast"

const RegisterContent: NextPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')

    const { toast } = useToast()

    const { register } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const doRegister = () => {
        if (!username || !email || !password || !confirm_password) {
            setIsLoading(false)
            return
        }
        if (confirm_password !== password) {
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        const payload = {
            username,
            password,
            email,
            confirm_password
        }
        register(payload).then((response) => {
            setIsLoading(false)
            console.log(response)
            toast({
                title: "Usuário registrado com sucesso!",
                description: (
                    <>
                        <p>Seja bem-vindo ao nosso sistema {username}!</p>
                    </>
                ),
            })
            goToLogin()
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
        })

    }

    const goToLogin = () => {
        router.push('/login')
    }


    return (
        <HomeBaseLayout
            title="Registrar"
        >
            <div className='flex flex-col items-center justify-center h-full gap-4'>
                <Input
                    label="Usuário"
                    placeholder="Usuário"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Senha"
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    label="Confirmar Senha"
                    placeholder="Confirmar Senha"
                    type="password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className='flex flex-row items-center justify-center gap-4'>
                    <Button
                        type="submit"
                        className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
                        onClick={doRegister}
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

            </div>
        </HomeBaseLayout>

    )
}

export default RegisterContent
