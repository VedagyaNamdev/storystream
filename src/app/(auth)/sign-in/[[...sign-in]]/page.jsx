import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return(
    

<div className='flex flex-row items-center justify-center gap-5 py-20'>

  <Image
  src={'/book-colorful.png'}
  alt='login'
  width={450}
  height={450}
  className="hidden md:block"/>
  
  <SignIn/>

</div>
  )
}