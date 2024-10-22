"use client"
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export default function StoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [storyVersions, setStoryVersions] = useState([]);
  const [storyTitle, setStoryTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    const generatedStory = searchParams.get('story');
    const generatedTitle = searchParams.get('storyTitle');
  
    if (generatedStory) {
      setStoryVersions([generatedStory]);
    }
    setStoryTitle(generatedTitle || '');
    setLoading(false);
  }, [searchParams]);

  const handleGenerateNewStory = () => {
    setLoading(true);
    setTimeout(() => {
      window.history.back();
    }, 2000);
  };

  const handleExpandStory = async () => {
    setExpanding(true);
    try {
      const lastVersion = storyVersions[storyVersions.length - 1];
      const response = await fetch('/expand-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story: lastVersion, title: storyTitle }),
      });

      if (!response.ok) {
        alert("Failed to expand story");
        throw new Error('Failed to expand story');
      }

      const data = await response.json();
      setStoryVersions(prevVersions => [...prevVersions, data.expandedStory]);
    } catch (error) {
      alert("Error expanding story");
      console.error('Error expanding story:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setExpanding(false);
    }
  };
  
  if (loading || expanding) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col items-center justify-center bg-white w-[300px] h-[300px] rounded-3xl shadow-md">
          <Image
            src="/loading.gif"
            alt="Loading"
            width={200}
            height={200}
          />
          <p className="text-xl mt-4 font-bold text-primary">
            {loading ? "Generating Story..." : "Expanding Story..."}
          </p>
        </div>
      </div>
    );
  }



  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    // Set font and center the title
    doc.setFontSize(18);
    const titleWidth = doc.getTextWidth(storyTitle);
    doc.setFont(undefined, 'bold');
    doc.text((pageWidth - titleWidth) / 2, margin, storyTitle || "Story");
  
    // Loop through storyVersions and add them as chapters
    doc.setFontSize(12);
    
    storyVersions.forEach((version, index) => {
      if (index !== 0) doc.addPage();
      
      let currentY = margin + 10; // Start position after title
      
      // Add chapter heading
      const chapterTitle = `Chapter ${index + 1}`;
      doc.setFont(undefined, 'bold'); // Set font to bold for chapter title
      const chapterTitleWidth = doc.getTextWidth(chapterTitle);
      doc.text((pageWidth - chapterTitleWidth) / 2, currentY, chapterTitle);
      doc.setFont(undefined, 'normal'); // Reset font to normal for story text
      
      currentY += 10; // Reduced space after chapter title
      
      // Split the text to fit within the page width
      const textLines = doc.splitTextToSize(version, pageWidth - (margin * 2));
      
      // Calculate lines per page with reduced line spacing
      const fontSize = doc.getFontSize();
      const lineHeight = fontSize * 0.55; // Reduced from 1.15 to 1.05 to 0.55 for tighter spacing
      const maxLinesPerPage = Math.floor((pageHeight - currentY - margin) / lineHeight);
      
      // Add text line by line, creating new pages as needed
      for (let i = 0; i < textLines.length; i++) {
        // Check if we need a new page
        if (currentY + lineHeight > pageHeight - margin) {
          doc.addPage();
          currentY = margin; // Reset Y position for new page
        }
        
        doc.text(margin, currentY, textLines[i]);
        currentY += lineHeight;
      }
    });
    
    // Save the PDF with a meaningful filename
    doc.save(`${storyTitle || 'Story'}.pdf`);
  };
  



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{storyTitle}</h1>
      
      {storyVersions.map((version, index) => (
        <div key={index} className="bg-white shadow-2xl rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
          {`Chapter ${index + 1}`}
          </h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{version}</p>
        </div>
      ))}

      {storyVersions.length === 0 && (
        <p className="text-red-500 text-center">No story generated. Please go back and generate a story.</p>
      )}

      <div className="flex justify-between space-x-4 mt-6">

        <button 
          onClick={handleGenerateNewStory} 
          className="bg-fuchsia-950 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded-xl"
        >
          Generate New Story
        </button>


        <button 
          onClick={handleDownloadPDF} 
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-xl"
          disabled={storyVersions.length === 0}>
        
          Download Story as PDF

        </button>


        <button 
          onClick={handleExpandStory} 
          className="bg-fuchsia-950  hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded-xl"
          disabled={expanding || storyVersions.length === 0}>
        
          {expanding ? 'Expanding...' : 'Expand Story'}

        </button>

      </div>
    </div>
  );
}