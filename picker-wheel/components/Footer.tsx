import React from 'react'
import { useRouter } from "next/router";

export default function Footer() {
    const router = useRouter()
    return (

        <footer>
            {router.pathname === "/pickerWheel" ?
                <div className='footer footer--bg'>

                </div>
                :
                <div className='footer'>

                </div>
            }

        </footer>
    )
}
