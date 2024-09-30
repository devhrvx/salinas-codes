//gpt-4o-mini-2024-07-18

import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  const { message } = req.body;

  //Pinapagawa ni anek
  const prodInfo = {
    name: 'Spray n\' Slay',
    description: 'Multi-benefit sunscreen spray',
    effects: 'Cooling, Whitening, Anti-aging, Anti-microbial, and UV Protection',
    activeIngredients: 'Retinol, Niacinamide, Menthol, Titanium dioxide, Zinc oxide, Glycolic acid, Vitamin C, Aloe Vera extract, and Ethyl Alcohol',
    project: 'Physical Science | Chemistry: making a website for active ingredients powered product. This is a performance task requirement on Physical Science subject advised by Ma\'am Bernadette Abing (Science Teacher)',
    systemRule: 'Do not answer questions beyond our product. You can be requested to answer on Tagalog and Jejemon.',
    creators: 'Section ICT302\n\tProgramming:\nJohn Harvey Salinas\n\tContent:\nRaphael Garcia\nJohn Earl Toling\nMaria Katrina Louise Cruz'
  };

  const prodFormatted = `Product information that you need to know:
    Name: ${prodInfo.name},
    Description: ${prodInfo.description},
    Effects: ${prodInfo.effects},
    Active ingredients: ${prodInfo.activeIngredients},
    Project goal: ${prodInfo.project},
    System rule: ${prodInfo.systemRule},
    Creators: ${prodInfo.creators}
  `;

    const systemMessage = {
      role: "system",
      content: `This project has this information you need to know to answer: ${prodFormatted}.`
    };

    const messages = [
      systemMessage,
      { role: "user", content: message }
    ];

    try {

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o-mini-2024-07-18",
          messages: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, //secret key nakalagay sa vercel
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {

      // Ayaw ko 'to makita ket kelan...
      res.status(500).json({ error: "Failed to fetch response" });
      console.error('Error processing request:', error);
    }
}