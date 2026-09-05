# Pull Request: Add crypto-data MCP Server

## MCP Server Details

**Name**: `io.github.acceptancestronk01-sudo/crypto-data`  
**Type**: HTTP-based MCP server  
**Description**: Payment-protected cryptocurrency data API via x402  

## Links

- **GitHub Repository**: https://github.com/acceptancestronk01-sudo/my-x402-mcp
- **Live Endpoint**: https://my-x402-mcp.vercel.app
- **MCP Metadata**: https://my-x402-mcp.vercel.app/mcp/tools

## server.json

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.acceptancestronk01-sudo/crypto-data",
  "description": "Payment-protected cryptocurrency data API via x402. Fetch real-time token data from DexScreener including prices, volume, liquidity, and trading pairs. Pay $0.002 USDC per call on Base Mainnet.",
  "homepage": "https://my-x402-mcp.vercel.app",
  "repository": {
    "url": "https://github.com/acceptancestronk01-sudo/my-x402-mcp",
    "source": "github"
  },
  "version": "1.0.0",
  "packages": [
    {
      "registryType": "url",
      "identifier": "https://my-x402-mcp.vercel.app",
      "version": "1.0.0",
      "transport": {
        "type": "http",
        "endpoint": "https://my-x402-mcp.vercel.app"
      }
    }
  ],
  "tags": ["crypto", "defi", "dexscreener", "web3", "payments", "x402"],
  "vendor": {
    "name": "acceptancestronk01-sudo",
    "url": "https://github.com/acceptancestronk01-sudo"
  },
  "payment": {
    "required": true,
    "protocol": "x402",
    "price": "$0.002",
    "currency": "USDC",
    "network": "Base Mainnet (eip155:8453)"
  }
}
```

## Verification

- ✅ GitHub account: acceptancestronk01-sudo
- ✅ Repository ownership verified
- ✅ README contains mcp-name marker
- ✅ Live endpoint responding correctly
- ✅ server.json schema validated

## Testing

```bash
# Health check
curl https://my-x402-mcp.vercel.app/health

# MCP metadata
curl https://my-x402-mcp.vercel.app/mcp/tools

# Payment-protected endpoint (returns 402)
curl https://my-x402-mcp.vercel.app/api/cryptodata?token=0x4200000000000000000000000000000000000006
```

## Notes

This is an HTTP-based MCP server that uses the x402 payment protocol. Users pay $0.002 USDC on Base Mainnet per API call.
