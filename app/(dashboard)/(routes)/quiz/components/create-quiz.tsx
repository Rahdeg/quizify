"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { formSchema } from './constant';
import * as z from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CopyCheck } from 'lucide-react';

const CreateQuiz = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          topic: "",
          amount: 3,
          type:"open_ended"
        }
      });
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
       console.log("val", values)
      };

      form.watch();

  return (
    <div className='h-full flex items-center justify-center'>
         <Card className=' '>
            <CardHeader className=' flex items-center'>
                <CardTitle className=' text-2xl font-bold'> Quiz Creation</CardTitle>
                <CardDescription>Choose a Topic</CardDescription>
            </CardHeader>
                <CardContent>
                
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          >
            <FormField 
            name="topic"
            render={({field})=>(
              <FormItem className="">
                <FormLabel>Topic</FormLabel>
                <FormControl className="m-0 p-0">
                  <Input className="pl-5"
                  disabled={isLoading}
                  placeholder="    Enter a topic ..."
                  {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
             <FormField 
            name="amount"
            render={({field})=>(
              <FormItem className="">
                <FormLabel>Number of questions</FormLabel>
                <FormControl className="m-0 p-0">
                  <Input className=" pl-5"
                  disabled={isLoading}
                  placeholder="    Enter an amount ..."
                  {...field}
                  type='number'
                  min={1}
                  max={10}
                  onChange={(e)=>{
                    form.setValue("amount", parseInt(e.target.value));
                  }}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <div className=' flex justify-between space-x-3'>
              <Button type='button' onClick={()=> form.setValue("type", "moq")} variant={form.getValues("type")=== "moq" ? "default" : "secondary"}>
                <CopyCheck className='w-4 h-4 mr-3'/> Multiple Choice
              </Button>
              <Button  type='button' onClick={()=> form.setValue("type", "open_ended")} variant={form.getValues("type")=== "open_ended" ? "default" : "secondary"}>
                <BookOpen className='w-4 h-4 mr-3'/> Open Ended
              </Button>

            </div>
            <Button className=" col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      
                </CardContent>
           
         </Card>
    </div>
  )
}

export default CreateQuiz