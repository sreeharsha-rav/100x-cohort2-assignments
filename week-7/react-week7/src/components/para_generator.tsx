// Assignment 3: Create a Paragraph Generator

import { useCallback, useState, memo } from "react";

const randomWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

type InputSectionProps = {
  wordCount: number;
  onWordCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
};

const InputSection = memo(
  ({ wordCount, onWordCountChange, onGenerate }: InputSectionProps) => {
    console.log("InputSection rendered");

    return (
      <div className="max-w-md mx-auto flex gap-4 mb-4">
        <input
          type="number"
          value={wordCount}
          onChange={onWordCountChange}
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={onGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </div>
    );
  }
);

function ParaGenerator() {
  const [wordCount, setWordCount] = useState(0);
  const [paragraph, setParagraph] = useState("");

  console.log("ParaGenerator rendered");

  const generateParagraph = useCallback(() => {
    let newParagraph = "";
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * randomWords.length);
      const randomWord = randomWords[randomIndex];
      newParagraph += `${randomWord} `;
    }
    setParagraph(newParagraph);
  }, [wordCount]);

  const handleWordCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Word count changed");
      setWordCount(parseInt(e.target.value));
    },
    []
  );

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-center text-2xl font-semibold mb-4">
        Paragraph Generator
      </h1>
      <InputSection
        wordCount={wordCount}
        onWordCountChange={handleWordCountChange}
        onGenerate={generateParagraph}
      />
      <div className="max-w-md mx-auto">{paragraph}</div>
    </div>
  );
}

export default ParaGenerator;
