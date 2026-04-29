import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { Input } from './ui/input'
import { Button } from './ui/button'

const Navbar = () => {
    return (
        <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}>
                        <div className="flex gap-2 items-center">
                            <img src={Logo} alt="" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                            <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
                        </div>
                    </Link>
                    < div className='relative hidden md:block'>
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                        />
                        <Button className="absolute right-0 top-0"><Search /></Button>
                    </div>
                </div>
                {/* nav section */}
                <nav className='flex md:gap-7 gap-4 items-center'></nav>
            </div>
        </div>
    )
}

export default Navbar
