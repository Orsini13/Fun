"use client";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
    const pathname = usePathname();

    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState<string | null>(null);

    useEffect(() => {
        const checkPermissions = async () => {
            if (window.arweaveWallet) {
                try {
                    const permissions =
                        await window.arweaveWallet.getPermissions();
                    // Check if permissions indicate the wallet is connected
                    setIsWalletConnected(
                        permissions.includes("ACCESS_ADDRESS")
                    );
                } catch (error) {
                    console.error("Error checking wallet permissions:", error);
                }
            }
        };

        checkPermissions();

        const intervalId = setInterval(checkPermissions, 1000); // Poll every 1 second

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isWalletConnected) {
            console.log("Wallet is connected!");
            // Perform actions when the wallet is connected

            async function getUserAccount() {
                const userAccount = await window.arweaveWallet.getActiveAddress(
                    ["ACCESS_ADDRESS"]
                );
                // console.log(userAccount);
                setUserAddress(userAccount);
            }

            getUserAccount();
        }
    }, [isWalletConnected]);

    async function connectWallet() {
        try {
            // connect to the ArConnect browser extension
            await window.arweaveWallet.connect(
                // request permissions
                ["ACCESS_ADDRESS", "SIGN_TRANSACTION"]
            );
        } catch (error) {
            alert("You should connect to ArConnect browser extension.");
            return false;
        }

        return true;
    }

    async function getWalletAddress() {
        let address;
        try {
            address = await window.arweaveWallet.getActiveAddress([
                "ACCESS_ADDRESS",
            ]);
        } catch (error) {
            return "";
        }

        return address;
    }

    return (
        <section className="flex flex-row justify-between gap-6 w-full bg-black bg-opacity-40 p-5 ">
            <div className="">
                {/* <h1 className="font-bold text-24 text-white">Dumz.Fun</h1> */}
                <Link href={"/"} className="font-bold text-24 text-white">
                    Dumz.Fun
                </Link>
            </div>

            <div className="flex flex-row gap-10 ">
                {navLinks.map((item) => {
                    const isActive =
                        pathname === item.route ||
                        pathname.startsWith(`${item.route}/`);

                    return (
                        <a href={item.route} key={item.id}>
                            <h1
                                className={cn("navlink", {
                                    "bg-blue-950": isActive,
                                })}
                            >
                                {item.label}
                            </h1>
                        </a>
                    );
                })}
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                {userAddress ? (
                    <>
                        <button className="text-white bg-blue-800 py-1 px-5 rounded-lg font-bold hover:bg-opacity-80">
                            {`${userAddress.slice(0, 5)}...${userAddress.slice(
                                -5
                            )}`}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={connectWallet}
                            className="text-white bg-blue-600 py-1 px-5 rounded-lg font-bold hover:bg-opacity-80"
                        >
                            Connect Wallet
                        </button>
                    </>
                )}

                {/* <ConnectButton
          accent="rgb(255, 0, 0)"
          profileModal={true}
          showBalance={false}
        /> */}
            </div>
        </section>
    );
};

export default Navbar;
