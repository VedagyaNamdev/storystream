"use client"
import StorytellingPlatform from '@/components/ui/StorytellingPlatform';
import Header from '../_components/Header';

export default function Home() {
  return (
    <div className="App">
      <Header />
      <div className='h-full pb-20'>
        <StorytellingPlatform />
      </div>
    </div>
  );
}