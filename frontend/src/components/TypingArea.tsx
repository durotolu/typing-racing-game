import React, { useState } from 'react';

const TypingArea: React.FC<{ disabled: boolean, onProgress: (progress: number) => void }> = ({
  onProgress,
  disabled,
}) => {
  const [input, setInput] = useState('');
  const sentence = 'Type this text as fast as you can!';

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    const progress = Math.min((value.length / sentence.length) * 100, 100);
    onProgress(progress);
  };
  
  return (
    <div>
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
