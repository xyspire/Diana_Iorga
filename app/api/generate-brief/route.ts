import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Lazy-initialize client inside request to prevent startup failures if key is not yet set
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const { companyName, industry, mood } = await req.json();

    if (!companyName || !industry || !mood) {
      return NextResponse.json(
        { error: 'Missing required parameters: companyName, industry, mood' },
        { status: 400 }
      );
    }

    const client = getAiClient();

    const systemPrompt = `
      You are an elite creative director at Nyro Silvan®, an award-winning minimal luxury design and visual interaction studio.
      Generate a customized, professional, highly opinionated, and sophisticated "Creative Art Direction Brief" for the brand.
      Your writing style must be clean, editorial, confident, and deeply inspiring (resembling luxury publications like Cereal, Kinfolk, or high-end design agency documentation).
      
      Structure your response in clear, beautifully formatted sections using simple HTML headings (<h4> and <h5>), paragraphs (<p>), and list blocks:
      
      1. DESIGN PHILOSOPHY CONCEPT: Develop a bespoke visual direction concept named with a poetic Title (e.g., "Sculpted Stillness", "Kinetic Void"). Detail the emotional resonance.
      2. TYPOGRAPHIC BLUEPRINT: Specify a high-fashion, high-contrast pairing of unique fonts (e.g. Display Serif paired with a Mono-grotesque) and clarify their usage weights and layout principles.
      3. CHROMATIC ATMOSPHERE: Define how the brand adapts to the studio's elite 5-color design palette (#0E155E Navy, #206abc Aquatic Blue, #7997e6 Periwinkle, #b37ad4 Orchid Purple, #caa9f3 Luxury Lavender) with specific descriptions and functional hierarchies. Keep it restrained and luxurious.
      4. INTERACTION BEHAVIORS: Discuss how the digital experience should breathe (micro-animations, click weights, and transition pacing).
    `;

    const prompt = `
      Create an Art Direction Brief for the following brand:
      Brand Name: "${companyName}"
      Industry/Niche: "${industry}"
      Desired Aesthetic Mood: "${mood}"
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Error generating design brief:', error);
    return NextResponse.json(
      { error: error?.message || 'Server-side extraction failed' },
      { status: 500 }
    );
  }
}
