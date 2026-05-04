import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, problemId, language } = await req.json();

  // Mock AI Roast Logic
  // In production, this would call OpenAI GPT-4o with a savage developer system prompt.
  
  const roasts = [
    "You solved it, but this O(n^2) nested loop suggests you enjoy watching servers suffer. Your code is so inefficient, I could mine Bitcoin in the gaps between your iterations.",
    "Pythonic? More like 'Python-sick'. Using a list comprehension for a side effect is the equivalent of using a chainsaw to cut butter. You did it, but at what cost?",
    "I've seen spaghetti with more structure than this solution. It works, but only because the compiler felt sorry for you.",
    "O(1)? More like O(Oh No). This hacky shortcut works for the test cases, but it's as fragile as your ego after reading this roast.",
  ];

  const roast = roasts[Math.floor(Math.random() * roasts.length)];
  
  // Simulated scores
  const scores = {
    performance: Math.floor(Math.random() * 40) + 20,
    elegance: Math.floor(Math.random() * 30) + 10,
    creativity: Math.floor(Math.random() * 50) + 50,
  };

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({
    verdict: roast,
    scores,
  });
}
