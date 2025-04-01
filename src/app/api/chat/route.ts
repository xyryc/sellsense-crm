import { NextRequest, NextResponse } from 'next/server';

// List of routes/features in the SellSense CRM
const crmRoutes = [
  "dashboard",
  "orders",
  "products",
  "suppliers",
  "contacts",
  "analytics",
  "referral",
  "sales report",
  "customer management",
  "invoice",
  "payment",
  "settings",
  "CRM features",
  "user management",
  "support",
  "profile"
];

// List of technical domains to handle non-CRM questions
const technicalDomains = [
  "coding",
  "programming",
  "web development",
  "API integration",
  "databases",
  "frontend development",
  "backend development",
  "DevOps",
  "server management",
  "deployment",
  "technical support"
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message); // Debugging

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Include context of available routes/features in the CRM and technical domains
    const routesContext = crmRoutes.join(', '); // Join all CRM routes/features as a string
    const technicalContext = technicalDomains.join(', '); // Join all technical topics as a string

    // Send a request to Gemini for processing the message
    console.log('Sending request to Gemini API...');
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `The following routes/features exist in this CRM system: ${routesContext}. Additionally, here are some technical topics: ${technicalContext}. 
                     The following message was sent: "${message}". Please provide a detailed response to the query.`
            }]
          }],
        }),
      }
    );

    const data = await geminiResponse.json();
    console.log('Gemini API response:', data); // Debugging

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const geminiMessage = data.candidates && data.candidates.length > 0
      ? data.candidates[0].content.parts[0].text.trim()
      : '';

    if (!geminiMessage) {
      return NextResponse.json({
        message: "Sorry, I couldn't understand your query. Please try asking something else."
      });
    }

    // Return the response from Gemini
    return NextResponse.json({ message: geminiMessage });
    
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
