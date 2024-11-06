"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomForm from "./CustomForm";
import Image from "next/image";
import InputFile from "./InputFile";
import { Loader2 } from "lucide-react";
import { createDataItemSigner, message } from "@permaweb/aoconnect";

const TokenForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Name: "",
            Ticker: "",
            InitialSupply: "", // 10 * 10 ^ 12 (12 decimals)
            Logo: "", // Should be a reference to the image
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("Form data:", data);
        setIsLoading(true);
    
        try {
            const userPermissions = await window.arweaveWallet.getPermissions();

            if (!userPermissions.includes("ACCESS_ADDRESS")) {
                //
                console.log("Show a message for them to connect their wallet");
                return;
            } else {
                await window.arweaveWallet.connect(
                    // request permissions
                    ["ACCESS_ADDRESS", "SIGN_TRANSACTION"]
                );
            }

            console.log(window.arweaveWallet);
            console.log(
                await window.arweaveWallet.getActiveAddress(["ACCESS_ADDRESS"])
            );
            console.log(await window.arweaveWallet.getPermissions());
            // console.log(
            //     await window.arweaveWallet.getActivePublicKey(["ACCESS_PUBLIC_KEY"])
            // );
            const initialSupplyFormatted = (parseFloat(data.InitialSupply) * 1e12).toString();
            console.log("Formatted initial supply:", initialSupplyFormatted);
            
            const messageId = await message({
                process: process.env.NEXT_PUBLIC_AO_PROCESS_ID as string,
                signer: createDataItemSigner(window.arweaveWallet),
                tags: [{ name: "Action", value: "Create" }],
                data: JSON.stringify({
                    Name: data.Name,
                    Ticker: data.Ticker,
                    InitialSupply: initialSupplyFormatted,
                    Logo: data.Logo,
                }),
            });
    
            console.log("Message ID:", messageId);
            setIsLoading(false);
            return messageId;
        } catch (error) {
            console.error("Error in submitting form:", error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                     onSubmit={(event) => {
                        event.preventDefault(); // Prevent default to see if it changes behavior
                        form.handleSubmit(onSubmit)(event); // Explicitly calling handleSubmit
                    }}
                    className="space-y-6"
                >
                    <>
                        <div className="flex flex-row gap-10">
                            <div className="flex flex-col gap-4 w-2/3">
                                <CustomForm
                                    name="Name"
                                    label="Name"
                                    placeholder="Enter your Token Name"
                                    control={form.control}
                                />
                                <CustomForm
                                    name="Ticker"
                                    label="Token symbol"
                                    placeholder="Enter your Token symbol"
                                    control={form.control}
                                />
                                <CustomForm
                                    name="InitialSupply"
                                    label="Initial Supply"
                                    placeholder="Enter your initial supply value"
                                    control={form.control}
                                />
                            </div>
                            <InputFile
                                onFileSelect={(file, imageId) => {
                                    console.log("File selected:", file);
                                    console.log("Image ID:", imageId);
                            
                                    if (file && imageId) {
                                        form.setValue("Logo", imageId); // Set form value
                                    }
                                }}
                            />
                        </div>
                    </>

                    <div className="flex flex-col gap-4">
                        <Button type="submit" className="button">
                            {!isLoading ? (
                                "Create Token"
                            ) : (
                                <Loader2 size={20} className="animate-spin" />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TokenForm;
