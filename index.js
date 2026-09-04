import express from 'express';
import { paymentMiddleware, x402ResourceServer } from '@x402/express';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to facilitator
const facilitatorClient = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL || 'https://x402.org/facilitator'
});

// Create resource server with payment schemes
const resourceServer = new x402ResourceServer(facilitatorClient)
  .register('eip155:*', new ExactEvmScheme());

// Configure routes with payment requirements
const routes = {
  'GET /api/cryptodata': {
    accepts: {
      scheme: 'exact',
      network: 'eip155:8453',
      payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1',
      price: '$0.002'
    },
    description: 'Fetch cryptocurrency token data from DexScreener',
    mimeType: 'application/json'
  }
};

// Apply the payment middleware
app.use(paymentMiddleware(routes, resourceServer));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'my-x402-mcp' });
});

// Protected crypto data endpoint - payment is handled by middleware
app.get('/api/cryptodata', async (req, res) => {
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
          price: '0.002',
          currency: 'USDC',
          network: 'Base Mainnet (eip155:8453)',
          payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
        }
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MCP server running on port ${PORT}`);
  console.log(`💰 Payment-protected endpoint: /api/cryptodata`);
  console.log(`📊 Price: $0.002 USDC per call on Base Mainnet`);
});

export default app;
