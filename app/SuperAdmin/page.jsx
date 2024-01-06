'use client'

import React, { useState } from "react";
import Image from 'next/image'
import Prokratura from "../../public/mdm++++ 3.png"
import Prokratura2 from "../../public/Remove-bg.ai_1700556647313.png"
import Diagramma from "../../components/Diagramma"

export default function SuperAdmin() {

    return (
        <>
            <div className='super_admin_page h-[70vh]'>
                <div className="flex justify-center items-center gap-10 pt-5">
                    <Image src={Prokratura2} width={100} height={100} alt='image' />
                    <Image src={Prokratura} width={200} height={100} alt='image' />
                </div>

                <Diagramma />
            </div >
        </>
    )
}