import { NextRequest, NextResponse } from 'next/server';

// List of routes/features in the SellSense CRM
const crmRoutes = [
  "dashboard", "orders", "products", "suppliers", "contacts", "analytics", 
  "referral", "sales report", "customer management", "invoice", "payment", 
  "settings", "CRM features", "user management", "support", "profile"
];

// List of technical domains to handle non-CRM questions
const technicalDomains = [
  "coding", "programming", "web development", "API integration", "databases", 
  "frontend development", "backend development", "DevOps", "server management", 
  "deployment", "technical support"
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Set context for CRM features and technical domains
    const routesContext = crmRoutes.join(', ');
    const technicalContext = technicalDomains.join(', ');

    // Send a request to Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Available routes: ${routesContext}. Technical topics: ${technicalContext}. Message: "${message}". Provide a brief and helpful response.`
            }]
          }],
        }),
      }
    );

    const data = await geminiResponse.json();
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const geminiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!geminiMessage) {
      return NextResponse.json({ message: "Sorry, I couldn't understand your query." });
    }

    // Return the simplified message from Gemini
    return NextResponse.json({ message: geminiMessage });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
