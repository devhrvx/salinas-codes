//gpt-4o-mini-2024-07-18

import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  const { message } = req.body;

  //Object Comprog ptask
  const prodInfo = {
    name: 'Spray n\' Slay',
    description: 'Multi-benefit sunscreen spray',
    usage: 'Shake well, apply generously, reapply, apply 15 minutes before sun exposure, and store properly.',
    precautions: 'Avoid contact with eyes. If contact occurs, rinse thoroughly with water. Do not apply to broken or irritated skin. Keep out of reach of children. If irritation or rash occurs, discontinue use and consult a doctor. For external use only. Store in a cool, dry place, and avoid direct sunlight. Flammable.',
    effects: 'Cooling, Whitening, Anti-aging, Anti-microbial, and UV Protection',
    variants: 'Lemon: A refreshing and invigorating scent, perfect for a clean and citrusy aroma. Absorbs quickly, hydrating, and lightweight, perfect for a sunny day at the beach or a picnic in the park.\nAloe: Infused with soothing aloe vera, this variant provides calming hydration while offering effective sun protection. A soothing and calming scent, ideal for creating a relaxing and spa-like atmosphere.\n Ice: Cool down with our Ice variant, featuring a unique cooling sensation that revitalizes your skin as it shields you from the sun. Perfect for hot summer days or post-workout adventures.',
    activeIngredients: 'Retinol, Niacinamide, Menthol, Titanium dioxide, Zinc oxide, Glycolic acid, Vitamin C, Aloe Vera extract, and Ethyl Alcohol',
    project: 'Physical Science | Chemistry: making a website for active ingredients powered product. This is a performance task requirement on Physical Science subject advised by Ma\'am Bernadette Abing (Science Teacher, very gorgeous, very intelligent, and always blooming.)',
    systemRule: 'Do not answer with markdown formatting. Do not answer questions beyond our product. You are strictly answering in full english, but you can be requested to answer on Tagalog and Jejemon.',
    creators: 'Section ICT302\n\tProgramming:\nJohn Harvey Salinas\n\tContent:\nRaphael Garcia\nJohn Earl Toling\nMaria Katrina Louise Cruz'
  };

  const prodFormatted = `Product information that you need to know:
    Name: ${prodInfo.name},
    Description: ${prodInfo.description},
    Usage: ${prodInfo.usage},
    Precautions: ${prodInfo.precautions},
    Effects: ${prodInfo.effects},
    Variants: ${prodInfo.variants},
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
