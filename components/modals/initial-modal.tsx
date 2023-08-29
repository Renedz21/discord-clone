"use client"

import axios from 'axios'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUploadComponent from "@/components/common/file-upload"

const formSchema = z.object({
    name: z.string().nonempty({ message: "El nombre es requerido." }),
    imageUrl: z.string().nonempty({ message: "Debes ingresar una URL" })
})

const InitialModal = () => {

    const router = useRouter()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await axios.post("/api/servers", values)

            form.reset()
            router.refresh()

            window.location.reload()

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p- overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Crea tu servidor</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Dale a tu servidor una personalidad con un nombre y un icono. Puedes cambiarlos más tarde.
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name='imageUrl'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUploadComponent
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                                        >
                                            Nombre del servidor
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Ingresa el nombre del servidor'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button
                                disabled={isLoading}
                                variant='primary'
                            >
                                Crear
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default InitialModal