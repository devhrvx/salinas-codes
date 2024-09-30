//gpt-4o-mini-2024-07-18

import axios from 'axios';

export default async function handler(req, res) {
  const { message } = req.body;

    const prodInfo = {
        name: 'Spray and Slay',
        description: 'Multi-benefit sunscreen spray',
        effects: 'Cooling, Whitening, Anti-aging, Anti-microbial,and UV Protection',
        activeIngredients: 'Retinol, Niacinamide, Menthol, Titanium dioxide, Zinc oxide, Glycolic acid, Vitamin C, Aloe Vera extract,and Ethyl Alcohol',
        project: 'Physical science chemistry making a website for active ingredients powered product'
    };

    const prodFormatted = `Product information that you need to know:
        Name: ${prodInfo.name},
        Description: ${prodInfo.description},
        Effects: ${prodInfo.effects},
        Active ingredients:  ${prodInfo.activeIngredients},
        Project goal: ${prodInfo.project}
        `;

  const systemMessage = {
    role: "system",
    content: `This project has these information you need to know to answer: ${prodFormatted}.`
  };

  const messages = [
    systemMessage,
    { role: "user", content: message }
  ];

  try {
    // Send system message first, followed by user message
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini-2024-07-18",
        messages: [
          systemMessage,  // Include system message with the object info
          { role: "user", content: message }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response" });
  }
}

