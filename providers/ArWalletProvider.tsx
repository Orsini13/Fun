"use client"
import { ArweaveWalletKit } from "arweave-wallet-kit";

import React from 'react'

export default function ArWalletProvider({children}: {children: React.ReactNode}) {
  return (
    <ArweaveWalletKit>
        {children}
    </ArweaveWalletKit>
  )
}
