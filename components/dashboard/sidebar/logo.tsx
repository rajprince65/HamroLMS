'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSidebar } from '@/context/SidebarContext'
import { Icon } from '@iconify/react'

const Logo: React.FC = () => {
  const { isExpanded, isHovered } = useSidebar()
  const showText = isExpanded || isHovered

  return (
    <Link href='/' className='flex items-center gap-4 overflow-hidden'>
      <div className=" p-2 rounded-lg">
        <Image src="https://png.pngtree.com/png-vector/20230315/ourmid/pngtree-education-school-logo-design-college-academic-student-vector-png-image_50796580.jpg" alt="Logo" width={50} height={50} />
        {/* <Icon icon="material-symbols:ecg-heart" width="24" height="24" className="text-white" /> */}
      </div>
      {showText && (
        <p className='text-[#1d4a6e] text-2xl font-semibold whitespace-nowrap transition-opacity duration-300'>
         HamroLMS
        </p>
      )}
    </Link>
  )
}

export default Logo
