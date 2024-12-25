import React from 'react'

const navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-950 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>my <span className='text-red-500'>-</span> <span>T</span><span className='text-green-500'>o</span><span>D</span><span className='text-green-500'>o</span></span>
            </div>
            <ul className='flex gap-9 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your To-Do</li>
            </ul>
        </nav>
    )
}

export default navbar
