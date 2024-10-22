import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateStory } from '../../config/GeminiAi';
import { useRouter } from 'next/navigation';

const StorytellingPlatform = () => {
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('');// New state for age
  const [characters, setCharacters] = useState([{ name: '', traits: '' }]);
  const [startingPoint, setStartingPoint] = useState('');
  const [plotPoints, setPlotPoints] = useState(['']);
  const [story, setStory] = useState('');
  const [storyTitle, setStoryTitle] = useState('');

  const router = useRouter();  

  const handleAddCharacter = () => {
    setCharacters([...characters, { name: '', traits: '' }]);
  };

  const handleRemoveCharacter = (index) => {
    const newCharacters = [...characters];
    newCharacters.splice(index, 1);
    setCharacters(newCharacters);
  };

  const handleCharacterChange = (index, field, value) => {
    const newCharacters = [...characters];
    newCharacters[index][field] = value;
    setCharacters(newCharacters);
  };

  const handleAddPlotPoint = () => {
    setPlotPoints([...plotPoints, '']);
  };

  const handleRemovePlotPoint = (index) => {
    const newPlotPoints = [...plotPoints];
    newPlotPoints.splice(index, 1);
    setPlotPoints(newPlotPoints);
  };

  const handlePlotPointChange = (index, value) => {
    const newPlotPoints = [...plotPoints];
    newPlotPoints[index] = value;
    setPlotPoints(newPlotPoints);
  };

  const handleGenerateStory = async () => {
    try {
      const storyData = {
        genre,
        characters,
        startingPoint,
        plotPoints,
        age,
      };
      
      const { title, story } = await generateStory(storyData);
      
      // Set the title and story state
      setStoryTitle(title);
      setStory(story);
      
      router.push(`/story?storyTitle=${encodeURIComponent(title)}&story=${encodeURIComponent(story)}`);

    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 space-y-6 rounded-3xl bg-white bg-opacity-20 backdrop-blur-md">
      <h1 className="text-3xl font-bold mb-6">Create Your Story</h1>

      <div>
        <Label htmlFor="genre"><b>Genre</b></Label>
        <Select onValueChange={setGenre} value={genre}>
          <SelectTrigger id="genre" className="border border-black rounded mt-2">
            <SelectValue placeholder="Select a genre for your story" />
          </SelectTrigger>
          <SelectContent className="bg-white bg-opacity-30 backdrop-blur-md">
            <SelectItem value="adventure">Adventure</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="scifi">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="thriller">Thriller</SelectItem>
            <SelectItem value="horror">Horror</SelectItem>
            <SelectItem value="historical">Historical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="age"><b>Your Age </b></Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-black rounded mt-2"
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield'}}
        />
      </div>

      <div>
        <Label><b>Characters</b></Label>
        {characters.map((character, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <Input
              placeholder="Character Name"
              value={character.name}
              onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
              className="border border-black rounded mt-2"
            />
            <Input
              placeholder="Character Traits"
              value={character.traits}
              onChange={(e) => handleCharacterChange(index, 'traits', e.target.value)}
              className="border border-black rounded mt-2"
            />
            <Button variant="outline" size="icon" onClick={() => handleRemoveCharacter(index)} className="border border-black rounded bg-slate-400 mt-2">
              <MinusCircle className="h-4 w-4 m-2" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddCharacter} className="border border-black rounded bg-slate-400">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Character
        </Button>
      </div>

      <div>
        <Label htmlFor="startingPoint"><b>Povide Starting Point</b></Label>
        <Input
          id="startingPoint"
          placeholder="Provide the starting point to give the story a directional start"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          className="border border-black rounded mt-2"
        />
      </div>

      <div>
        <Label><b>Must-Have Plot Points</b></Label>
        {plotPoints.map((point, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <Input
              placeholder="Enter key points that you want the story to have"
              value={point}
              onChange={(e) => handlePlotPointChange(index, e.target.value)}
              className="border border-black rounded mt-2"
            />
            <Button variant="outline" size="icon" onClick={() => handleRemovePlotPoint(index)} className="border border-black rounded bg-slate-400 mt-2">
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddPlotPoint} className="border border-black rounded bg-slate-400">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Plot Point
        </Button>
      </div>

      <Button className="w-full" onClick={handleGenerateStory}>
        Generate Story
      </Button>

      {/* {story && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">{storyTitle}</h2>
          <p>{story}</p>
        </div>
      )} */}
    </div>
  );
};

export default StorytellingPlatform;
