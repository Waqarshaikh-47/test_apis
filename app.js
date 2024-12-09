const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to test the API using a GET request
app.get("/test-api", async (req, res) => {
  try {
    // Extract query parameters (for testing)
    const { refid, id_number } = req.query;

    if (!refid || !id_number) {
      return res.status(400).json({
        error:
          "Please provide both 'refid' and 'id_number' as query parameters",
      });
    }

    // API credentials and payload
    const apiUrl =
      "https://api.verifya2z.com/api/v1/verification/pandetails_verify";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3MzM0NzU1NDIsInBhcnRuZXJJZCI6IkNPUlAwMDAwMTQ3NyIsInJlcWlkIjozNTA2NTE0LCJpYXQiOjE3MzM0NzU1NDJ9.cNpq8io8OcvIJJei-c5F57NYIjuYhTvWOGly4brZqfU";

    const headers = {
      Token: token,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "CORP00001477",
    };

    const payload = {
      refid,
      id_number,
    };

    // Make the POST request
    const response = await axios.post(apiUrl, payload, { headers });

    // Send back the API's response
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
