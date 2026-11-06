export function alignTexts(targetText: string, transcript: string) {
  const targetWords = targetText.split(/\s+/);
  const spokenWords = transcript.split(/\s+/);
  
  // A clean matching rule to see if words look or sound alike
  const words = targetWords.map((word) => {
    const isMatched = spokenWords.some(spoken => 
      spoken.trim() === word.trim() || 
      word.includes(spoken) && spoken.length > 1
    );
    return {
      ar: word,
      matched: isMatched
    };
  });

  const matchedCount = words.filter(w => w.matched).length;
  const score = targetWords.length > 0 ? matchedCount / targetWords.length : 0;

  return { words, score };
}
