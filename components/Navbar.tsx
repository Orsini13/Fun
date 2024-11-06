"use client";
import React from "react";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const pathname = usePathname();

    async function connectWallet() {
      try {
        // connect to the ArConnect browser extension
        await window.arweaveWallet.connect(
          // request permissions
          ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
        );
      } catch (error) {
        alert('You should connect to ArConnect browser extension.');
        return false;
      }
    
      return true;
    }

    async function getWalletAddress() {
        let address;
        try {
            address = await window.arweaveWallet.getActiveAddress(["ACCESS_ADDRESS"]);
        } catch (error) {
            return "";
        }

        return address;
    }

    return (
        <section className="flex flex-row justify-between gap-6 w-full bg-black bg-opacity-40 p-5 ">
            <div className="">
                <h1 className="font-bold text-24 text-white">Dumz.Fun</h1>
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
                <button
                    onClick={connectWallet}
                    className="text-white bg-blue-600 py-1 px-5 rounded-lg font-bold hover:bg-opacity-80"
                >
                    connect wallet
                </button>
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
