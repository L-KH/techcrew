import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image, confidenceThreshold } = req.body;
    
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/plastic-xxx5r/2",
      params: {
        api_key: process.env.ROBOFLOW_API_KEY,
        confidence: confidenceThreshold
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const predictions = response.data.predictions || [];
    const riskScore = calculateRiskScore(predictions);

    return res.status(200).json({
      predictions: predictions,
      riskScore: riskScore
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: error.message || 'Failed to process image',
      error: error
    });
  }
}


function calculateRiskScore(predictions) {
    if (predictions.length === 0) {
      // Return a special value for clean images
      return -1;
    }
  
    const plasticCount = predictions.filter(p => p.class === 'plastic').length;
    const avgConfidence = predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length;
    const totalArea = predictions.reduce((acc, p) => acc + (p.width * p.height), 0);
  
    // Calculate normalized scores (0-1)
    const countScore = Math.min(plasticCount / 10, 1);
    const confidenceScore = avgConfidence;
    const areaScore = Math.min(totalArea / 100000, 1);
  
    // Weighted combination
    const weightedScore = (
      (countScore * 0.4) + 
      (confidenceScore * 0.3) + 
      (areaScore * 0.3)
    ) * 100;
  
    return Math.round(weightedScore);
  }
  