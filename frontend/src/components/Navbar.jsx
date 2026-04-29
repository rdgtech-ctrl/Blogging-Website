import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link>
                        <div className="flex gap-2 items-center">
                            <img src="" alt="" />
                            <h1>Logo</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
