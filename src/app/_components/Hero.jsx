import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Hero() {
  return (
    <div className='px-6 sm:px-10 md:px-28 lg:px-44 mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        
        <div>
          {/* Responsive text sizing */}
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-primary font-extrabold py-6 md:py-10'>
          Turn Your Ideas into Captivating Tales
          </h2>
          
          {/* Responsive font size */}
          <p className='text-lg sm:text-xl md:text-2xl text-primary font-light'>
          Transform your ideas into captivating tales with our AI-powered story generator. Craft unique adventures in minutes, tailored to your imagination.
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
        <div className='flex justify-center items-center'>
          <Image
            src="/hero.png"
            alt="hero"
            width={500}
            height={500}
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
