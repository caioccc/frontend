import type { NextPage } from 'next'
import { useState } from 'react'

import HomeBaseLayout from '@/components/Layout/_HomeBaseLayout'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent
} from "@/components/ui/tabs"
import CategoriesList from './components/MyCategories'

const CategoriesContent: NextPage = () => {
    const { logout } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    return (
        <HomeBaseLayout
            title="Todo List"
        >
            <div className='flex flex-col items-center justify-center h-full gap-4'>
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <Button
                        type="button"
                        className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md test-see-tasks"
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
                                    <div className='flex flex-row justify-between'>
                                        <div className='flex flex-col w-full gap-2'>
                                            <CardTitle>Minhas categorias</CardTitle>
                                            <CardDescription>
                                                Aqui estão suas categorias.
                                            </CardDescription>
                                        </div>
                                        <div className='flex flex-row'>
                                            <Button
                                                type="button"
                                                className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md test-add-category"
                                                onClick={() => router.push('/categories/new')}
                                                disabled={isLoading}
                                            >
                                                <i className="fas fa-plus"></i>
                                                Adicionar Categoria
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <CategoriesList />
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

export default CategoriesContent
