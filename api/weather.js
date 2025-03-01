// /api/weather.js

export default async function handler(req, res) {
    const city = req.query.city || "Nairobi";
    const apiKey = process.env.API_KEY;
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        return res.status(data.cod).json({ error: data.message });
      }
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
  