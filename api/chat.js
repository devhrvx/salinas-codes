//gpt-4o-mini-2024-07-18
// Import axios for making HTTP requests
import axios from 'axios';

// Export default handler function for the API route
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Destructure message from request body
  const { message } = req.body;

  // Define product information object
  const prodInfo = {
    name: 'Spray and Slay',
    description: 'Multi-benefit sunscreen spray',
    effects: 'Cooling, Whitening, Anti-aging, Anti-microbial, and UV Protection',
    activeIngredients: 'Retinol, Niacinamide, Menthol, Titanium dioxide, Zinc oxide, Glycolic acid, Vitamin C, Aloe Vera extract, and Ethyl Alcohol',
    project: 'Physical science chemistry making a website for active ingredients powered product',
    systemRule: 'Do not answer questions beyond our product',
    creators: 'Creators from section ICT302\n\tProgramming:\nJohn Harvey Salinas\n\tContent:\nRaphael Garcia\nJohn Earl Toling\nMaria Katrina Louise Cruz'
  };

  // Format product information into a string
  const prodFormatted = `Product information that you need to know:
    Name: ${prodInfo.name},
    Description: ${prodInfo.description},
    Effects: ${prodInfo.effects},
    Active ingredients: ${prodInfo.activeIngredients},
    Project goal: ${prodInfo.project},
    System rule: ${prodInfo.systemRule},
    Creators: ${prodInfo.creators}
  `;

  // Define system message object
  const systemMessage = {
    role: "system",
    content: `This project has this information you need to know to answer: ${prodFormatted}.`
  };

  // Prepare messages array with system message followed by user message
  const messages = [
    systemMessage,
    { role: "user", content: message }
  ];

  try {
    // Send system message first, followed by user message to OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini-2024-07-18",
        messages: messages, // Pass messages array
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for API key
          'Content-Type': 'application/json',
        },
      }
    );

    // Send successful response with JSON data from OpenAI API
    res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (error) {
    // Handle errors by sending 500 status and JSON error message
    res.status(500).json({ error: "Failed to fetch response" });
    console.error('Error processing request:', error);
  }
}
