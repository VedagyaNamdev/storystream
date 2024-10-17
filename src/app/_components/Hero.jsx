import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Hero() {
  return (
    <div className='px-6 sm:px-10 md:px-28 lg:px-44 mt-10 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        
        <div>
          {/* Responsive text sizing */}
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-primary font-extrabold py-6 md:py-10'>
            Craft Stories in Minutes
          </h2>
          
          {/* Responsive font size */}
          <p className='text-lg sm:text-xl md:text-2xl text-primary font-light'>
            Create fun and personalized stories tailored right to your interest
          </p>
          
          {/* Button styling for better responsiveness */}
          <Link href={'/create_story'}>
            <Button 
              size='lg' 
              color='primary' 
              className='mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl px-6 md:px-8 py-4 md:py-6'
            >
              Create Story
            </Button>
          </Link>
        </div>

        {/* Image container */}
        <div className='flex justify-center md:justify-start items-center'>
          <Image
            src="/book.png"
            alt="hero"
            width={400}
            height={400}
            className="hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
