import type { NextPage } from 'next'
import { useState } from 'react'

import HomeBaseLayout from '@/components/Layout/_HomeBaseLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUser } from '@/services/login/loginService'
import { useRouter } from 'next/router'
import { useToast } from "@/hooks/use-toast"

const LoginContent: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const { toast } = useToast()

  const doLogin = () => {
    if (!username || !password) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    const payload = {
      username,
      password
    }
    loginUser(payload).then((response) => {
      setIsLoading(false)
      console.log(response)
      toast({
        title: "Usuário logado com sucesso!"
      })
    }).catch((error) => {
      setIsLoading(false)
      console.log(error)
      toast({
        title: "Erro ao logar!",
        description: (
          <>
            <p>Usuário ou senha incorretos!</p>
          </>
        ),
      })
    })
  }

  const goToRegister = () => {
    router.push('/register')
  }


  return (
    <HomeBaseLayout
      title="Login"
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
          label="Senha"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className='flex flex-row items-center justify-center gap-4'>
          <Button
            type="submit"
            className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
            onClick={doLogin}
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
                  <i className="fas fa-sign-in-alt"></i>
                  Entrar
                </>
              )}
          </Button>

          <Button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            onClick={goToRegister}
          >
            <i className="fas fa-user-plus"></i>
            Cadastrar
          </Button>
        </div>

      </div>
    </HomeBaseLayout>

  )
}

export default LoginContent
