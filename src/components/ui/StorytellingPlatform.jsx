import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StorytellingPlatform = () => {
  const [genre, setGenre] = useState('');
  const [characters, setCharacters] = useState([{ name: '', traits: '' }]);
  const [startingPoint, setStartingPoint] = useState('');
  const [plotPoints, setPlotPoints] = useState(['']);
  const [story, setStory] = useState('');
  const [age, setAge] = useState(''); // New state for age

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
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        genre,
        characters,
        startingPoint,
        plotPoints,
        age,  // Send age to the API
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setStory(data.story);
    } else {
      const errorData = await response.json();
      console.error('Error generating story:', errorData);
      alert('Failed to generate story. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Story</h1>

      <div>
        <Label htmlFor="genre"><b>Genre</b></Label>
        <Select onValueChange={setGenre} value={genre}>
          <SelectTrigger id="genre">
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="adventure">Adventure</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="scifi">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="age"><b>Your Age </b>(in years)</Label> {/* New Age Label */}
        <Input
          id="age"
          type="number" // Number input for age
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)} // Handle age change
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
            />
            <Input
              placeholder="Character Traits"
              value={character.traits}
              onChange={(e) => handleCharacterChange(index, 'traits', e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={() => handleRemoveCharacter(index)}>
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddCharacter}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Character
        </Button>
      </div>

      <div>
        <Label htmlFor="startingPoint"><b>Starting Point</b> (To give the story a directional start)</Label>
        <Input
          id="startingPoint"
          placeholder="Enter the starting point of your story"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
        />
      </div>

      <div>
        <Label><b>Must-Have Plot Points</b> (Key points that you want the story to have)</Label>
        {plotPoints.map((point, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <Input
              placeholder="Enter a plot point"
              value={point}
              onChange={(e) => handlePlotPointChange(index, e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={() => handleRemovePlotPoint(index)}>
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={handleAddPlotPoint}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add Plot Point
        </Button>
      </div>

      <Button className="w-full" onClick={handleGenerateStory}>
        Generate Story
      </Button>

      {story && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Generated Story</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
};

export default StorytellingPlatform;
