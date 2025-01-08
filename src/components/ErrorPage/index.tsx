/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../ui/button";

interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    message: string;
}

const ErrorPage = ({ title, message, ...props }: ErrorPageProps) => {
    const router = useRouter();

    return (
        <div className="w-screen h-screen flex flex-col bg-white overflow-hidden" {...props}>
            <div className="flex flex-col w-full h-[90vh] justify-center px-[4.5rem] md:px-[3rem] sm:px-[1rem]">
                <div className="flex flex-col gap-12 max-w-[17rem] z-10 md:mt-20 sm:mt-10">
                    <div className="flex flex-col gap-4">
                        <h1
                            size="md"
                            color="neutral.low.pure"
                            className="test_title_error_page w-[70%]"
                        >
                            {title}
                        </h1>
                        <p
                            size="xxs"
                            color="neutral.low.medium"
                            className="test_message_error_page"
                        >
                            {message}
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        label={'Voltar para o início'}
                        onClick={() => router.push('/dashboard')}
                        testId="test_button_error_page"
                    />
                </div>

            </div>
        </div>
    );
}

export default ErrorPage;