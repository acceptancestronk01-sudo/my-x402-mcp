# my-x402-mcp

MCP tool with x402 payment middleware for fetching cryptocurrency data from DexScreener.

## Features

- **Payment-protected API**: $0.002 USDC per call via x402
- **Network**: Base Mainnet (eip155:8453)
- **Data source**: DexScreener public API
- **MCP compliant**: Tool metadata endpoint included

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Run the server:
```bash
npm start
```

## API Endpoints

### GET /api/cryptodata

Fetch token data from DexScreener (payment required).

**Query Parameters:**
- `token` (required): Token contract address

**Example:**
```bash
curl "http://localhost:3000/api/cryptodata?token=0x..."
```

**Payment:**
- Price: $0.002 USDC
- Network: Base Mainnet
- Payment address: 0xf081ee84c0d85278a6242bc265f0b312021ebeb1

### GET /mcp/tools

Get MCP tool metadata.

### GET /health

Health check endpoint.

## Deployment

Deploy to Vercel:

```bash
vercel
```

The `vercel.json` configuration is already set up for Express.

## Response Format

```json
{
  "token": "0x...",
  "timestamp": "2026-09-04T13:40:35.000Z",
  "pairs": [...],
  "schemaVersion": "1.0.0"
}
```
