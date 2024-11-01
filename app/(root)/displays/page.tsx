import TokenCard from '@/components/TokenCard';
import { Button } from '@/components/ui/button';
import React from 'react'

const Display = () => {
  return (
    <section className='justify-center items-center flex flex-col'>
        
        <header className='text-36 text-white m-auto my-14'>
            Best Tokens and NFTs Launch on...
        </header>

        <Button className='button mb-10'>
            Create Token
        </Button>

        <TokenCard />

    </section>
  )
}

export default Display;