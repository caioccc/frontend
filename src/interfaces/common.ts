export type PaginationResponse = {
    pages: number
    total: number
    current_page: number
}

export type RequestProgressStatus = 'loading' | 'default' | 'error' | 'success'

export type ApiRequestHandlerStatus = {
    requestState: RequestProgressStatus
    statusCode?: number
    errorMessage?: string
}

export enum DateFormat {
    DATETIME = 'DATETIME',
    FULL_DATE = 'FULL_DATE',
    MONTH_YEAR = 'MONTH_YEAR',
    DAY_MONTH = 'DAY_MONTH',
    TIME = 'TIME',
    ISO_DATE = 'ISO_DATE',
}

export type Language = 'pt' | 'en'

export type APIError = {
    label: string
    description: string
    code: string
}

export type ErrorResponse = {
    errors: APIError[]
    request_id?: string
}

export type CustomErrorResponse = {
    response: {
        data: ErrorResponse
    }
}

export type UserData = {
    username: string
    email: string
    id: number
}


export type LoginResponse = {
    user: UserData
    token: string
}

export interface LoginFormData {
    username: string
    password: string
}

export interface PasswordFormData {
    password: string
    confirm_password: string
}

export interface EmailValidationFormData {
    email: string
}

export type RegisterFormData = {
    username: string
    email: string
    password: string
}

export type OptionsPage = {
    [key: string]: string | number | boolean | null
}
