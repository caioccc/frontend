import '@/styles/globals.css'

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { AuthProvider, ProtectedRoute } from '@/contexts/AuthContext'
import PageWithTransition from '@/components/Layout/_PageWithTransition'

const MyApp = (props: AppProps) => {

    return (
        <>
            <Head>
                <title>Minhas Tarefas App</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open%20Sans:wght@300;500;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </Head>
            <main>
                <ThemeProvider theme={{ mode: 'light' }}>
                    <AuthProvider>
                        <ProtectedRoute>
                            <PageWithTransition {...props} />

                            {/* <props.Component {...props.pageProps} /> */}
                        </ProtectedRoute>
                    </AuthProvider>
                </ThemeProvider>
            </main >
        </>
    )
}

export default appWithTranslation(MyApp)
