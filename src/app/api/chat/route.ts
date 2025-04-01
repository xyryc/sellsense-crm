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
  "analytics",
  "invoice",
  "payment",
  "settings",
  "CRM features",
  "user management",
  "support",
  "profile"
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message); // Debugging

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Include context of available routes/features in the message to improve classification
    const routesContext = crmRoutes.join(', '); // Join all routes/features as a string

    // Send a request to Gemini asking it to classify if the message is relevant to CRM support
    console.log('Sending request to Gemini API...');
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `The following routes/features exist in this CRM system: ${routesContext}. 
                     Is the following message related to one of these routes/features? "${message}".
                     Respond with "Relevant" or "Irrelevant".`
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

    if (geminiMessage.toLowerCase() === 'irrelevant') {
      return NextResponse.json({
        message: "Sorry, I am a support chatbot for this site. Please ask relevant questions about SellSense CRM."
      });
    }

    // If relevant, send the original message to Gemini for further processing
    const crmResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const crmData = await crmResponse.json();
    if (crmData.error) {
      console.error('Gemini API Error:', crmData.error);
      return NextResponse.json({ error: crmData.error.message }, { status: 500 });
    }

    if (crmData.candidates && crmData.candidates.length > 0) {
      return NextResponse.json({ message: crmData.candidates[0].content.parts[0].text });
    } else {
      return NextResponse.json({ error: 'No response from Gemini' }, { status: 500 });
    }

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
