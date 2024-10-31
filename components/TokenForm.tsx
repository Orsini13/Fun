"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, } from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomForm from './CustomForm'

const TokenForm = () => {

    const formSchema = authFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const onSubmit = ()=>{

    }

  return (
    <div>

          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 
                      <>
                          <div className='flex gap-4'>
                              <CustomForm
                                  name="name" label="First Name" placeholder="Enter your First Name" control={form.control}
                              />
                              <CustomForm
                                  name="name" label="Last Name" placeholder="Enter your Last Name" control={form.control}
                              />
                          </div>
                     
                        
                      </>
             

                  <div className='flex flex-col gap-4'>
                      <Button type="submit">
                        submit
                      </Button>
                  </div>
              </form>
          </Form>
    </div>
  )
}

export default TokenForm