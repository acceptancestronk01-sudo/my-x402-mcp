# Getting Listed on x402 Bazaar

## Overview

Your MCP server will automatically appear on **https://x402bazaar.app** after your first paid call settles through the CDP Facilitator. No registration form needed!

## Current Status

✅ **Bazaar-Compatible Implementation**: `index-bazaar.js` is ready with:
- CDP SDK integration
- Bazaar discovery metadata extension
- Complete input/output schemas
- Example responses
- Tags for discoverability

## How to Get Listed

### Step 1: Deploy Bazaar-Compatible Version

```bash
# Install CDP SDK dependencies
npm install

# Update package.json start script to use index-bazaar.js
# Then deploy to Vercel
vercel --prod
```

### Step 2: Validate Your Endpoint

Test that your endpoint returns proper 402 Payment Required:

```bash
curl -i https://my-x402-mcp.vercel.app/api/cryptodata?token=0x4200000000000000000000000000000000000006
```

Should return:
```
HTTP/1.1 402 Payment Required
```

### Step 3: Optional - Manual Validation

You can manually validate your endpoint with CDP:

```bash
curl -X POST https://api.cdp.coinbase.com/platform/v2/x402/validate \
  -H "Content-Type: application/json" \
  -d '{
    "resource": "https://my-x402-mcp.vercel.app/api/cryptodata",
    "method": "GET"
  }'
```

### Step 4: Complete First Paid Call

Once a user completes a paid call through the CDP Facilitator:
1. Payment settles on Base Mainnet
2. CDP automatically catalogs your endpoint
3. Your service appears on x402bazaar.app within minutes

## Discovery Confirmation

After a paid call, check the `EXTENSION-RESPONSES` header in the settle response (base64-encoded JSON):

- `"success"` - Metadata cataloged ✅
- `"processing"` - Being cataloged asynchronously ⏳
- `"rejected"` - Check `rejectedReason` for validation errors ❌

## Requirements for Listing

### Required:
- ✅ Public HTTPS URL
- ✅ Returns `402 Payment Required`
- ✅ Valid `extensions.bazaar` metadata block
- ✅ Accepts payments through CDP Facilitator
- ✅ Base/USDC only

### For Featured/Curated Tier:
- Live mainnet payments
- ≥99% availability (30-day window)
- Complete input schemas and examples
- Clear agent-focused description
- Passes platform health probes

## Your Endpoint Details

**URL**: `https://my-x402-mcp.vercel.app/api/cryptodata`  
**Method**: `GET`  
**Price**: $0.002 USDC  
**Network**: Base Mainnet (eip155:8453)  
**Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

**Query Parameters**:
- `token` (required): Token contract address (0x...)

**Example Request**:
```bash
GET /api/cryptodata?token=0x4200000000000000000000000000000000000006
```

## Maintenance

To stay listed:
- Complete at least 1 paid call every 30 days
- Maintain ≥99% uptime
- Continue returning 402 for unpaid requests
- Respond to health probes

**Auto-removal happens when**:
- No settlements for 30+ days
- Health probes fail consistently
- Endpoint stops returning 402

## Tracking Your Listing

Once listed, find your endpoint on:
- **Browse**: https://x402bazaar.app
- **Search by tags**: crypto, defi, dexscreener, tokens, prices, mcp
- **Your payment address**: Search by `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## Metadata Quality Tips

**Description**: 
- Clear, natural language explanation
- ≤500 characters
- Agent-focused (explain when to use it)

**Schemas**:
- Complete JSON Schema for inputs/outputs
- Realistic examples that agents can learn from
- Validation patterns for string fields

**Tags**:
- Relevant keywords for discovery
- Use common terms agents search for

## Support

- **x402 Docs**: https://docs.cdp.coinbase.com/x402
- **GitHub**: https://github.com/coinbase/x402
- **Bazaar**: https://x402bazaar.app

## Files

- `index-bazaar.js` - Bazaar-compatible implementation with CDP SDK
- `index-mock.js` - Mock version for local testing
- `index.js` - Original generic x402 implementation

---

**Ready to deploy?** Update your `package.json` start script to use `index-bazaar.js` and deploy to Vercel. Your first paid call will automatically list you on x402bazaar.app! 🚀
