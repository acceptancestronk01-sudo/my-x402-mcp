import express from 'express';
import { createX402Server } from '@coinbase/cdp-sdk/x402';
import { declareDiscoveryExtension } from '@x402/extensions/bazaar';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Create x402 server with Bazaar discovery metadata
const x402Server = await createX402Server({
  routes: {
    'GET /api/cryptodata': {
      price: '$0.002',
      currency: 'USDC',
      network: 'eip155:8453',
      payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1',
      description: 'Fetch real-time cryptocurrency token data from DexScreener. Returns token pairs, prices, volume, and market data for any token address.',
      extensions: {
        ...declareDiscoveryExtension({
          method: 'GET',
          queryParamsSchema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                description: 'Token contract address (e.g., 0x4200000000000000000000000000000000000006)',
                pattern: '^0x[a-fA-F0-9]{40}$'
              }
            },
            required: ['token']
          },
          output: {
            schema: {
              type: 'object',
              properties: {
                token: { type: 'string', description: 'Queried token address' },
                timestamp: { type: 'string', format: 'date-time' },
                pairs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      chainId: { type: 'string' },
                      dexId: { type: 'string' },
                      pairAddress: { type: 'string' },
                      baseToken: { type: 'object' },
                      quoteToken: { type: 'object' },
                      priceUsd: { type: 'string' },
                      volume: { type: 'object' },
                      liquidity: { type: 'object' }
                    }
                  }
                },
                schemaVersion: { type: 'string' }
              }
            },
            example: {
              token: '0x4200000000000000000000000000000000000006',
              timestamp: '2026-09-04T15:07:34.740Z',
              pairs: [
                {
                  chainId: 'base',
                  dexId: 'uniswap-v3',
                  pairAddress: '0xabc...',
                  baseToken: {
                    address: '0x4200000000000000000000000000000000000006',
                    name: 'Wrapped Ether',
                    symbol: 'WETH'
                  },
                  quoteToken: {
                    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                    name: 'USD Coin',
                    symbol: 'USDC'
                  },
                  priceUsd: '2455.84',
                  volume: { h24: 125000 },
                  liquidity: { usd: 850000 }
                }
              ],
              schemaVersion: '1.0.0'
            }
          },
          tags: ['crypto', 'defi', 'dexscreener', 'tokens', 'prices', 'mcp']
        })
      },
      handler: async (req, res) => {
        try {
          const { token } = req.query;

          if (!token) {
            return res.status(400).json({
              error: 'Missing token parameter',
              usage: '/api/cryptodata?token=<TOKEN_ADDRESS>'
            });
          }

          // Validate token address format
          if (!/^0x[a-fA-F0-9]{40}$/.test(token)) {
            return res.status(400).json({
              error: 'Invalid token address format',
              expected: '0x followed by 40 hexadecimal characters'
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
      }
    }
  }
});

// Mount x402 server middleware
app.use(x402Server.middleware());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'my-x402-mcp', bazaar: 'enabled' });
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
        },
        bazaar: {
          listed: true,
          discoverable: 'after first paid call'
        }
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MCP server running on port ${PORT}`);
  console.log(`💰 Payment-protected endpoint: /api/cryptodata`);
  console.log(`📊 Price: $0.002 USDC per call on Base Mainnet`);
  console.log(`🏪 x402 Bazaar: Auto-discovery enabled`);
  console.log(`📝 Complete a paid call to get listed on https://x402bazaar.app`);
});

export default app;
