import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Payment configuration
const PAYMENT_CONFIG = {
  price: '0.002',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Data MCP - x402 Payment Protected API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #667eea;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #667eea; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 10px 10px 0;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔐 Crypto Data MCP</h1>
            <p class="subtitle">Payment-Protected DexScreener API via x402 Protocol</p>
            <div>
                <span class="badge">MCP Server</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">DexScreener</span>
            </div>
            <div class="price">$0.002 USDC per call</div>
            <div>
                <a href="/mcp/tools" class="btn">View MCP Metadata</a>
                <a href="https://github.com/acceptancestronk01-sudo/my-x402-mcp" class="btn">GitHub</a>
            </div>
        </div>

        <div class="card">
            <h2>✨ Features</h2>
            <div class="feature">
                <strong>💳 Micropayments</strong> - Pay-per-use model with USDC on Base Mainnet
            </div>
            <div class="feature">
                <strong>🔒 x402 Protected</strong> - Industry-standard payment protocol
            </div>
            <div class="feature">
                <strong>📊 Real-time Data</strong> - Live cryptocurrency data from DexScreener
            </div>
            <div class="feature">
                <strong>🤖 MCP Compatible</strong> - Works with Claude and other AI agents
            </div>
            <div class="feature">
                <strong>⚡ Fast & Reliable</strong> - Deployed on Vercel Edge Network
            </div>
        </div>

        <div class="card">
            <h2>🚀 Quick Start</h2>
            <p><strong>Endpoint:</strong> <code>GET /api/cryptodata?token={TOKEN_ADDRESS}</code></p>
            <h3 style="margin-top: 20px;">Example Request:</h3>
            <div class="code-block">curl https://my-x402-mcp.vercel.app/api/cryptodata?token=0x4200000000000000000000000000000000000006</div>
            <h3 style="margin-top: 20px;">Response (402 Payment Required):</h3>
            <div class="code-block">{
  "error": "Payment Required",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.002",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  }
}</div>
        </div>

        <div class="card">
            <h2>💰 Payment Details</h2>
            <div class="feature">
                <strong>Network:</strong> Base Mainnet (eip155:8453)
            </div>
            <div class="feature">
                <strong>Currency:</strong> USDC
            </div>
            <div class="feature">
                <strong>Price:</strong> $0.002 per API call
            </div>
            <div class="feature">
                <strong>Protocol:</strong> x402 "exact" scheme
            </div>
            <div class="feature">
                <strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Data MCP - x402 Payment Protected API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #667eea;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #667eea; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 10px 10px 0;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🔐 Crypto Data MCP</h1>
            <p class="subtitle">Payment-Protected DexScreener API via x402 Protocol</p>
            <div>
                <span class="badge">MCP Server</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">DexScreener</span>
            </div>
            <div class="price">$0.002 USDC per call</div>
            <div>
                <a href="/mcp/tools" class="btn">View MCP Metadata</a>
                <a href="https://github.com/acceptancestronk01-sudo/my-x402-mcp" class="btn">GitHub</a>
            </div>
        </div>

        <div class="card">
            <h2>✨ Features</h2>
            <div class="feature">
                <strong>💳 Micropayments</strong> - Pay-per-use model with USDC on Base Mainnet
            </div>
            <div class="feature">
                <strong>🔒 x402 Protected</strong> - Industry-standard payment protocol
            </div>
            <div class="feature">
                <strong>📊 Real-time Data</strong> - Live cryptocurrency data from DexScreener
            </div>
            <div class="feature">
                <strong>🤖 MCP Compatible</strong> - Works with Claude and other AI agents
            </div>
            <div class="feature">
                <strong>⚡ Fast & Reliable</strong> - Deployed on Vercel Edge Network
            </div>
        </div>

        <div class="card">
            <h2>🚀 Quick Start</h2>
            <p><strong>Endpoint:</strong> <code>GET /api/cryptodata?token={TOKEN_ADDRESS}</code></p>
            <h3 style="margin-top: 20px;">Example Request:</h3>
            <div class="code-block">curl https://my-x402-mcp.vercel.app/api/cryptodata?token=0x4200000000000000000000000000000000000006</div>
            <h3 style="margin-top: 20px;">Response (402 Payment Required):</h3>
            <div class="code-block">{
  "error": "Payment Required",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.002",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  }
}</div>
        </div>

        <div class="card">
            <h2>💰 Payment Details</h2>
            <div class="feature">
                <strong>Network:</strong> Base Mainnet (eip155:8453)
            </div>
            <div class="feature">
                <strong>Currency:</strong> USDC
            </div>
            <div class="feature">
                <strong>Price:</strong> $0.002 per API call
            </div>
            <div class="feature">
                <strong>Protocol:</strong> x402 "exact" scheme
            </div>
            <div class="feature">
                <strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'my-x402-mcp' });
});

// Protected crypto data endpoint with mock payment verification
app.get('/api/cryptodata', async (req, res) => {
  // Check for payment header (x402 format)
  const paymentHeader = req.headers['x-payment-signature'];

  if (!paymentHeader) {
    // Bazaar discovery metadata (encoded as base64 JSON in response header)
    const bazaarMetadata = {
      method: 'GET',
      description: 'Fetch real-time cryptocurrency token data from DexScreener. Returns token pairs, prices, volume, and market data for any token address.',
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
      outputSchema: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          pairs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                chainId: { type: 'string' },
                dexId: { type: 'string' },
                pairAddress: { type: 'string' },
                priceUsd: { type: 'string' },
                volume: { type: 'object' },
                liquidity: { type: 'object' }
              }
            }
          }
        }
      },
      tags: ['crypto', 'defi', 'dexscreener', 'tokens', 'prices', 'mcp']
    };

    // Add Bazaar discovery header
    res.setHeader('X-Bazaar-Metadata', Buffer.from(JSON.stringify(bazaarMetadata)).toString('base64'));

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

// x402 Bazaar discovery endpoint
app.get('/.well-known/x402', (req, res) => {
  res.json({
    version: '1.0',
    endpoints: [
      {
        path: '/api/cryptodata',
        method: 'GET',
        description: 'Fetch real-time cryptocurrency token data from DexScreener',
        payment: {
          scheme: 'exact',
          network: PAYMENT_CONFIG.chainId,
          price: PAYMENT_CONFIG.price,
          currency: PAYMENT_CONFIG.currency,
          payTo: PAYMENT_CONFIG.payTo
        },
        queryParams: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token contract address',
              pattern: '^0x[a-fA-F0-9]{40}$'
            }
          },
          required: ['token']
        },
        tags: ['crypto', 'defi', 'dexscreener', 'tokens', 'prices', 'mcp']
      }
    ]
  });
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
        },
        bazaar: {
          discoverable: true,
          discoveryUrl: '/.well-known/x402'
        }
      }
    ]
  });
});

// Serve static files (after API routes to avoid conflicts)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 MCP server running on port ${PORT}`);
  console.log(`💰 Payment-protected endpoint: /api/cryptodata`);
  console.log(`📊 Price: $${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} per call on Base Mainnet`);
  console.log(`🏪 Bazaar discovery: /.well-known/x402`);
  console.log(`⚠️  Mock payment verification enabled (for testing)`);
});

export default app;
