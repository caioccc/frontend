import api from '../api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (payload: any, code: string) => {
    const response = await api.post('/api/auth/login/', {...payload},
    {
        headers: {
            'X-AUTHENTICATION-CODE': code,
        },
    }
    )
    return response
}