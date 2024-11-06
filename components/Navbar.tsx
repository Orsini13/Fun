"use client"
import React from 'react'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Navbar = () => {

    const pathname = usePathname();

    return (

        <section className="flex flex-row justify-between gap-6 w-full bg-black bg-opacity-40 p-5 ">

            <div className=''>
                <h1 className='font-bold text-24 text-white'>Dumz.Fun</h1>
            </div>


            <div className="flex flex-row gap-10 ">
                {navLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`/${item.route}`)

                    return (
                    <Link href={item.route} key={item.label}>
                            <h1 className={cn('navlink', { 'bg-blue-950': isActive })}
                        >
                            {item.label}
                        </h1>
                    </Link>)
                })}
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <button className="text-white bg-blue-600 py-1 px-5 rounded-lg font-bold hover:bg-opacity-80">
                    connect wallet
                </button>
            </div>


        </section>
    )
}

export default Navbar