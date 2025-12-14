import natural from "natural";

const analyzer = new natural.SentimentAnalyzer('English', 
  natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

export function analyzeSentiment(text) {
  if (!text || typeof text !== 'string') {
    return { score: 0, sentiment: 'neutral' };
  }
  
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const score = analyzer.getSentiment(tokens);
  
  let sentiment;
  if (score > 0.1) {
    sentiment = 'positive';
  } else if (score < -0.1) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return {
    score: parseFloat(score.toFixed(3)),
    sentiment,
    tokens: tokens.length
  };
}

export function analyzeGiftReviews(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return { averageScore: 0, overallSentiment: 'neutral', reviewCount: 0 };
  }
  
  const sentiments = reviews.map(review => analyzeSentiment(review.text || review.comment));
  const averageScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;
  
  let overallSentiment;
  if (averageScore > 0.1) {
    overallSentiment = 'positive';
  } else if (averageScore < -0.1) {
    overallSentiment = 'negative';
  } else {
    overallSentiment = 'neutral';
  }
  
  return {
    averageScore: parseFloat(averageScore.toFixed(3)),
    overallSentiment,
    reviewCount: reviews.length,
    sentiments
  };
}