# Deploying x402 MCP Server to Apify

## Prerequisites

1. **Apify Account**: Sign up at https://apify.com
2. **Apify CLI**: Install globally
   ```bash
   npm install -g apify-cli
   ```
3. **Apify API Token**: Get from https://console.apify.com/account/integrations

## Deployment Steps

### 1. Login to Apify CLI

```bash
apify login
```

Enter your API token when prompted.

### 2. Initialize Apify Actor (if needed)

```bash
apify init
```

Select "Web server" when prompted for actor type.

### 3. Deploy to Apify

```bash
apify push
```

This will:
- Build your Docker container
- Upload to Apify
- Deploy as an Actor

### 4. Configure Standby Mode (for 24/7 availability)

After deployment, go to:
1. https://console.apify.com/actors
2. Select your `my-x402-mcp` actor
3. Go to **Settings** → **Standby**
4. Enable **Standby mode**
5. Set **Standby port**: `3000`

### 5. Get Your Apify URL

Once deployed with Standby enabled:
```
https://<actor-name>.<your-username>.apify.actor/
```

Example:
```
https://my-x402-mcp.yourname.apify.actor/api/cryptodata?token=0x...
```

## Configuration Files Created

- **`.apify/actor.json`** - Apify Actor configuration
- **`.apify/input_schema.json`** - Input parameters schema
- **`Dockerfile`** - Container configuration

## Environment Variables

Set these in Apify Console under Settings → Environment variables:

- `PORT` - Port number (default: 3000)
- `NODE_ENV` - Environment (default: production)

## Cost Estimation

### Standby Mode (24/7 availability):
- **$49/month** for basic standby
- **$0.25/hour** compute time
- Perfect for APIs that need constant uptime

### On-Demand Mode (cheaper):
- Pay only when running
- Cold start delay (2-5 seconds)
- Good for testing

## Testing Your Deployment

After deployment, test endpoints:

```bash
# Health check
curl https://my-x402-mcp.yourname.apify.actor/health

# Bazaar discovery
curl https://my-x402-mcp.yourname.apify.actor/.well-known/x402

# API endpoint (should return 402)
curl https://my-x402-mcp.yourname.apify.actor/api/cryptodata?token=0x4200000000000000000000000000000000000006
```

## Advantages of Apify vs Vercel

**Apify:**
- ✅ Full Docker control
- ✅ Better for long-running processes
- ✅ More memory/CPU options
- ✅ Better for compute-heavy tasks
- ❌ More expensive for simple APIs
- ❌ Cold starts without Standby mode

**Vercel (current):**
- ✅ Free tier is generous
- ✅ Instant deploys
- ✅ Great for APIs like yours
- ✅ Built-in CDN
- ❌ 10-second serverless timeout
- ❌ Limited compute resources

## Recommendation

**Keep Vercel for now** unless you need:
- Longer execution times (>10 seconds)
- More memory/CPU
- Full Docker control
- Custom system dependencies

Your current x402 MCP API is perfect for Vercel. Apify would be overkill unless you're adding heavy computation or need guaranteed 24/7 standby.

## Multi-Platform Strategy

You can deploy to **both**:
- **Vercel**: Primary (fast, free, reliable)
- **Apify**: Backup or for specific heavy operations

Update your `.well-known/x402` to list both endpoints for redundancy.

## Support

- **Apify Docs**: https://docs.apify.com
- **Apify Discord**: https://discord.com/invite/jyEM2PRvMU
- **Web Server Actors**: https://docs.apify.com/platform/actors/development/programming-interface/web-server

---

**Ready to deploy?** Run `apify push` from this directory!
