import axios from "axios";

export const getAIResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // Use gpt-4 if needed
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "BidNest",
        },
      }
    );

    const aiReply = response.data.choices[0]?.message?.content?.trim() || "";
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "AI response fetch failed", details: error.message });
  }
};
