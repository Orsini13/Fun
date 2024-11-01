"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomForm from './CustomForm'
import Image from 'next/image'
import InputFile from './InputFile'
import { Loader2 } from 'lucide-react'

const TokenForm = () => {

    const formSchema = authFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
    }

    return (
        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <>
                        <div className='flex flex-row gap-10'>
                            <div className='flex flex-col gap-4 w-2/3'>
                                <CustomForm
                                    name="name" label="Name" placeholder="Enter your Token Name" control={form.control}
                                />
                                <CustomForm
                                    name="symbol" label="Token symbol" placeholder="Enter your Token symbol" control={form.control}
                                />
                            </div>
                            <InputFile />
                        </div>

                        <div className=" flex flex-col gap-6">
                            <CustomForm
                                name="description" label="Description" placeholder="Enter your Description" control={form.control}
                            />
                            <CustomForm
                                name="twitterLink" label="Twitter link" placeholder="Enter your Twitter link" control={form.control}
                            />
                            <CustomForm
                                name="telegramLink" label="Telegram link" placeholder="Enter your Telegram link" control={form.control}
                            />
                            <CustomForm
                                name="websiteLink" label="Website link" placeholder="Enter your Website link" control={form.control}
                            />
                        </div>
                    </>

                    <div className='flex flex-col gap-4'>
                        <Button type="submit"
                        className='button'>
                            <h1>Create Token</h1>
                            <Loader2 size={20} className='animate-spin' />

                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default TokenForm