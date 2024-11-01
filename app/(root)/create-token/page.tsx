import TokenForm from '@/components/TokenForm'
import React from 'react'

const page = () => {
    return (
        <section className=''>

            <article className='text-36 flex justify-center text-center m-auto text-white mt-10  '>
                Launch your Token <br /> on DumzFun
            </article>

            <section className='m-auto p-7 w-1/2 h-1/4 '>
                <TokenForm
                />
            </section>


        </section>
    )
}

export default page