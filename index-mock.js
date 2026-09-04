import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Payment configuration
const PAYMENT_CONFIG = {
  price: '0.002',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'my-x402-mcp' });
});

// Protected crypto data endpoint with mock payment verification
app.get('/api/cryptodata', async (req, res) => {
  // Check for payment header (x402 format)
  const paymentHeader = req.headers['x-payment-signature'];

  if (!paymentHeader) {
    // Return 402 Payment Required with x402 payment instructions
    return res.status(402).json({
      error: 'Payment Required',
      message: 'This endpoint requires payment to access',
      payment: {
        scheme: 'exact',
        network: PAYMENT_CONFIG.chainId,
        price: `$${PAYMENT_CONFIG.price}`,
        currency: PAYMENT_CONFIG.currency,
        payTo: PAYMENT_CONFIG.payTo,
        description: 'Fetch cryptocurrency token data from DexScreener'
      },
      instructions: 'Include X-Payment-Signature header with valid payment proof'
    });
  }

  // Mock payment verification (for testing)
  // In production, this would verify the actual payment signature
  console.log(`Payment received: ${paymentHeader}`);

  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: 'Missing token parameter',
        usage: '/api/cryptodata?token=<TOKEN_ADDRESS>'
      });
    }

    // Fetch data from DexScreener API
    const dexScreenerUrl = `https://api.dexscreener.com/latest/dex/tokens/${token}`;
    const response = await axios.get(dexScreenerUrl);

    // Clean and return the payload
    const cleanedData = {
      token: token,
      timestamp: new Date().toISOString(),
      pairs: response.data.pairs || [],
      schemaVersion: response.data.schemaVersion
    };

    res.json(cleanedData);
  } catch (error) {
    if (error.response) {
      // DexScreener API error
      res.status(error.response.status).json({
        error: 'DexScreener API error',
        message: error.response.data?.message || 'Failed to fetch token data',
        token: req.query.token
      });
    } else {
      // Internal server error
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
});

// MCP tool metadata endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'cryptodata',
        description: 'Fetch cryptocurrency token data from DexScreener',
        inputSchema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token contract address to query'
            }
          },
          required: ['token']
        },
        payment: {
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          network: `Base Mainnet (${PAYMENT_CONFIG.chainId})`,
          payTo: PAYMENT_CONFIG.payTo
        }
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MCP server running on port ${PORT}`);
  console.log(`💰 Payment-protected endpoint: /api/cryptodata`);
  console.log(`📊 Price: $${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} per call on Base Mainnet`);
  console.log(`⚠️  Mock payment verification enabled (for testing)`);
});

export default app;
