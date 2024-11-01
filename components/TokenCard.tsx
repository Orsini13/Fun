"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { cards } from '@/constants'
import AnimatedCounter from './AnimatedCounter'


const TokenCard = () => {
    const [isActive, setIsActive] = useState(false)
    const user = 'Frank Akiba'

    return (
        <section>
            {
                cards.map((items) => {
                    return (
                        <div className=' bg-gray-950 bg-opacity-55 flex flex-col gap-1 borders p-3' key={items.id}>
                            { isActive && <div className='flex flex-row mb-2 justify-between'>

                                <div className='text-blue-700 text-18 font-medium justify-center'>
                                    {user}
                                </div>

                                <div className='flex flex-row gap-2 ' key={items.id}>
                                    <Image src={items.img} alt='apps'
                                        width={15} height={10} />
                                    <Image src={items.img} alt='apps'
                                        width={15} height={10} />
                                    <Image src={items.img} alt='apps'
                                        width={15} height={10} />
                                </div>
                            </div>
                            }

                            <div className='  flex flex-row gap-4 pr-16'
                               >
                                <div>
                                    <Image
                                        src={items.img} alt='img' width={150} height={100}
                                    />
                                </div>

                                <div className=' flex flex-col justify-between '>
                                    <h1 className='text-white font-medium'>Created By: {items.creator}</h1>
                                    <h1 className='text-white font-medium'>Time: {items.time}</h1>
                                    <h1 className='text-white font-medium'>Ticker: {items.symbol}</h1>
                                    <h1 className='text-green-700 font-medium flex flex-row gap-2'>
                                        <p>Market Cap:</p> <AnimatedCounter
                                            amount={230} />
                                    </h1>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default TokenCard