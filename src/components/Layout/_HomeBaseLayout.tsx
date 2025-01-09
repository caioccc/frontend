import React from 'react'

interface HomeBaseLayoutProps extends PageHeaderProps {
    children: React.ReactNode
}

const HomeBaseLayout = ({
    children,
    title,
}: HomeBaseLayoutProps) => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 w-full">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                {/* Header with title */}
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {title}
                </h1>

                {children}
            </div>
        </div>
    )
}

export default HomeBaseLayout
