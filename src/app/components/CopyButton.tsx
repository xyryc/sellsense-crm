// app/components/CopyButton.tsx
'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}