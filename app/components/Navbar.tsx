

import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-evenly bg-red-400 sticky text-white'>
        <Link href={'/games/seven-eleven'}>7</Link>
    </nav>
  )
}
