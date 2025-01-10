/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingProgress } from '@/components/LoadingProgress'
import { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    LoginFormData,
    LoginResponse,
    RegisterFormData,
    UserData
} from '../interfaces/common'
import api from '../services/api'

const unprotectedRoutes = [
    '/login',
    '/register',
    '/404',
    '/403',
    '/500',
]

type AuthProviderProps = {
    children: React.ReactNode
}

type IAuthContext = {
    isAuthenticated: boolean
    loading: boolean
    user?: UserData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (newUser: any) => void
    visibility: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: (body: LoginFormData) => Promise<any>
    settings: RegisterPendingData | null
    logout: () => void
    register: (body: RegisterFormData) => Promise<any>
}


const isExternalPage = (path: string) => {
    return !!unprotectedRoutes.find((route) =>
        path.startsWith(route.replaceAll('[key]', ''))
    )
}

const defaultAuthContextValues: IAuthContext = {
    isAuthenticated: false,
    loading: true,
    user: undefined,
    setUser: (newUser: any) => {
        return undefined
    },
    login: async () => {
        return undefined
    },
    logout: () => {
        return undefined
    },
    register: async () => {
        return undefined
    }
}

const AuthContext = createContext<IAuthContext>(defaultAuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const loadUserFromCookies = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            const userSaved = localStorage.getItem('user')
            if (token && userSaved) {
                setLoading(false)
                setUser(JSON.parse(userSaved))
                router.push(`/tasks`)
            } else {
                setLoading(false)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('settings')
                router.push(`/login?redirect=${router.route}`)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoading(false)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('settings')
            router.push(`/login?redirect=${router.route}`)
        }
    }, [])


    useEffect(() => {
        if (!isExternalPage(router.pathname)) {
            loadUserFromCookies()
        } else {
            setLoading(false)
        }
    }, [])


    const login = async (body: LoginFormData) => {
        const config = {
            headers: {},
        } as AxiosRequestConfig

        const { data } = await api.post<LoginResponse>(
            '/api/auth/login/',
            body,
            config
        )

        if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('local_user', JSON.stringify(data.local_user))
            setUser(data.user)
        }

        return data
    }

    const register = async (body: LoginResponse) => {
        const config = {
            headers: {},
        } as AxiosRequestConfig

        const { data } = await api.post<RegisterResponse>(
            '/api/auth/register/',
            body,
            config
        )
        return data
    }

    const logout = () => {
        setUser(undefined)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('local_user')
        destroyCookie(null, 'redirect_route')
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                setUser,
                login,
                loading,
                logout,
                isExternalPage,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

type ProtetedRouteProps = {
    children: React.ReactNode
}

export const ProtectedRoute = ({
    children,
}: ProtetedRouteProps): JSX.Element => {
    const router = useRouter()
    const { isAuthenticated, loading } = useAuth()

    const pathIsProtected = !(unprotectedRoutes.indexOf(router.pathname) !== -1)

    useEffect(() => {
        if (!isAuthenticated && !loading && pathIsProtected) {
            router.push(`/login?redirect=${router.route}`)
        }
    }, [isAuthenticated, loading])

    if ((loading || !isAuthenticated) && pathIsProtected) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingProgress />
            </div>
        )
    }

    return <>{children}</>
}
