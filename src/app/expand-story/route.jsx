import { NextResponse } from 'next/server';
import { expandStory } from '../../config/GeminiAi';

export async function POST(request) {
  try {
    const { story, title } = await request.json();
    const { expandedStory } = await expandStory({ story, title });
    return NextResponse.json({ expandedStory });
  } catch (error) {
    console.error('Error expanding story:', error);
    return NextResponse.json({ error: 'Failed to expand story' }, { status: 500 });
  }
}