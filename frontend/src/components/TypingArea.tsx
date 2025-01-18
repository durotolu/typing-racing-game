import React, { useState } from 'react';

const TypingArea: React.FC<{ disabled: boolean, onProgress: (progress: number) => void, sentence: string }> = ({
  onProgress,
  disabled,
  sentence
}) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Calculate accuracy by comparing each character
    let correctChars = 0;
    const charsToCheck = Math.min(value.length, sentence.length);
    for (let i = 0; i < charsToCheck; i++) {
      if (value[i] === sentence[i]) {
        correctChars++;
      }
    }
    
    // Calculate accuracy percentage based on the target sentence length
    const accuracy = (correctChars / sentence.length) * 100;
    
    // If input is longer than sentence, penalize the progress
    const lengthPenalty = value.length > sentence.length ? 
      Math.max(0, 1 - (value.length - sentence.length) / sentence.length) : 1;
    
    // Final progress considers accuracy, completion and length penalty
    let progress = Math.min(accuracy * lengthPenalty, 100);
    
    // If text matches exactly, set progress to 100
    if (value === sentence) {
      progress = 100;
    }
    
    onProgress(progress);
  };
  
  return (
    <div>
      <p>Instruction: Type the below text as fast as you can!</p>
      <p>{sentence}</p>
      <textarea
        value={input}
        disabled={disabled}
        onChange={handleInputChange}
        className="w-1/2 border p-2"
      />
    </div>
  );
};

export default TypingArea;
