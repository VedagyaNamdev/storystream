import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export async function generateStory({ genre, age, characters, startingPoint, plotPoints }) {
  // Construct the prompt based on user input
  let characterDescriptions = characters.map((char) => `${char.name}, who is ${char.traits}`).join(', ');
  let plotPointsString = plotPoints.join(', ');

  // Updated prompt to ask for both a title and a story
  const prompt = `Create a story for a ${age} years old person, of ${genre} genre, with the following character(s): ${characterDescriptions}. The story should start with: "${startingPoint}". The story must include: "${plotPointsString}". Additionally, give the story a captivating title.`;

  try {
    // Send prompt to Gemini API
    const result = await model.generateContent(prompt, generationConfig);
    
    const response = await result.response;
    const generatedText = response.text();

    if (!generatedText) {
      throw new Error('No story or title generated');
    }

    // Assuming the response contains both a title and a story (AI could return title in the first line)
    const [storyTitle, ...storyLines] = generatedText.split('\n'); // Split by lines
    const generatedStory = storyLines.join('\n').trim(); // Rejoin the story
    const cleanedTitle = storyTitle.replace(/^#+\s*/, '');

    if (!storyTitle || !generatedStory) {
      throw new Error('Failed to extract title or story');
    }

    return {
      title: cleanedTitle.trim(), // Title is the first line
      story: generatedStory,     // Story is the rest of the lines
    };
  } catch (error) {
    console.error('Error generating story and title:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function expandStory({ story, title }) {
   // Extract the last few sentences of the previous chapter to maintain continuity
   const sentences = story.split(/[.!?]+\s+/);
   const lastSentences = sentences.slice(-3).join('. ') + '.';
 
   const prompt = `
 Continue the story titled "${title}" by creating the next chapter. Here's where the previous chapter left off:
 
 "${lastSentences}"
 
 Create a new chapter that:
 1. Picks up directly from this point
 2. Introduces new developments or conflicts
 3. Maintains consistency with the established characters and plot
 4. Advances the story in an interesting direction
 5. Matches the tone and style of the previous content
 
 Important: Do not repeat or expand the previous content. Instead, write a new chapter that continues the story forward.
 
 Begin the new chapter directly without any introductory text or chapter number.`;
 
   try {
     const result = await model.generateContent(prompt, generationConfig);
     const response = await result.response;
     const expandedStory = response.text();
 
     if (!expandedStory) {
       throw new Error('No expanded story generated');
     }
 
     return {
       expandedStory: expandedStory.trim(),
     };
   } catch (error) {
     console.error('Error expanding story:', error);
     throw error;
   }
 }

export default { generateStory, expandStory };
