import React from 'react'
import WheatherBadge from '../WheatherBadge'
import IpStackComponent from '../IpStackComponent'

interface HomeBaseLayoutProps extends PageHeaderProps {
    children: React.ReactNode
}

const HomeBaseLayout = ({
    children,
    title,
}: HomeBaseLayoutProps) => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 w-full">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 gap-4 flex flex-col">
                {/* Header with title */}
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        {title}
                    </h1>

                    <WheatherBadge />
                </div>

                {children}
                <IpStackComponent />
            </div>
        </div>
    )
}

export default HomeBaseLayout
