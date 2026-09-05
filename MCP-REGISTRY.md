# Registering on registry.modelcontextprotocol.io

## Overview

Your MCP server can be registered on the official Model Context Protocol registry at https://registry.modelcontextprotocol.io

## Prerequisites

✅ Already completed:
- GitHub repository: https://github.com/acceptancestronk01-sudo/my-x402-mcp
- Deployed service: https://my-x402-mcp.vercel.app
- `server.json` created with proper schema
- README.md updated with `mcp-name` marker

## Registration Steps

### Step 1: Install mcp-publisher CLI

**On Windows (PowerShell):**
```powershell
# Download the Windows binary
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_windows_amd64.zip" -o mcp-publisher.zip

# Extract and add to PATH
Expand-Archive mcp-publisher.zip -DestinationPath "$env:USERPROFILE\mcp-publisher"
$env:PATH += ";$env:USERPROFILE\mcp-publisher"
```

**Or download manually:**
- Go to: https://github.com/modelcontextprotocol/registry/releases/latest
- Download `mcp-publisher_windows_amd64.zip`
- Extract and run `mcp-publisher.exe`

### Step 2: Authenticate with GitHub

```bash
cd C:\Users\Toha\Desktop\01PC\scripts\my-x402-mcp
mcp-publisher login github
```

This will:
1. Show you a device code
2. Open GitHub in your browser
3. Ask you to enter the code and authorize

### Step 3: Verify server.json

Your `server.json` is already created with:
- **Name**: `io.github.acceptancestronk01-sudo/crypto-data`
- **Type**: HTTP-based MCP server
- **Endpoint**: `https://my-x402-mcp.vercel.app`
- **Payment info**: x402, $0.002 USDC on Base

### Step 4: Publish to Registry

```bash
mcp-publisher publish
```

This will:
- Read your `server.json`
- Verify your GitHub ownership (via `io.github.acceptancestronk01-sudo/` prefix)
- Submit to the registry
- Return success confirmation

### Step 5: Verify Registration

Check your listing:

**Via API:**
```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=crypto-data"
```

**Via Web:**
Go to: https://registry.modelcontextprotocol.io and search for "crypto-data"

## Your MCP Details

**Registry Name**: `io.github.acceptancestronk01-sudo/crypto-data`  
**Type**: HTTP/URL-based server  
**Transport**: HTTP endpoint  
**Version**: 1.0.0  
**Payment**: x402 Protocol, $0.002 USDC per call

## Important Notes

### HTTP-based vs npm Package

Your MCP is registered as an **HTTP-based server** (deployed service), not an npm package. This means:

- ✅ Users access it via URL: `https://my-x402-mcp.vercel.app`
- ✅ No npm installation required
- ✅ Works with MCP clients that support HTTP transport
- ⚠️ Some MCP clients primarily support stdio (npm packages)

### Namespace Ownership

Your namespace `io.github.acceptancestronk01-sudo/` is verified via:
- GitHub authentication as user `acceptancestronk01-sudo`
- Repository ownership at `https://github.com/acceptancestronk01-sudo/my-x402-mcp`

### Updates

To update your listing after changes:

1. Update `server.json` version number
2. Run `mcp-publisher publish` again
3. New version appears on registry

## Troubleshooting

**"Authentication failed"**
- Run `mcp-publisher login github` again
- Make sure you authorized the app on GitHub

**"Namespace mismatch"**
- Ensure `mcpName` in README matches `name` in server.json
- Both must start with `io.github.acceptancestronk01-sudo/`

**"Invalid server.json"**
- Validate schema: `mcp-publisher validate`
- Check all required fields are present

## Alternative: Option 2 - Publish as npm Package

If you want broader compatibility, you could also package your MCP as an npm package that wraps your HTTP endpoint:

1. Create a client wrapper package
2. Publish to npm as `@acceptancestronk01-sudo/mcp-crypto-data`
3. Add `mcpName` to package.json
4. Register as stdio transport

This would allow both HTTP access (current) and npm installation.

## Support

- **Registry Docs**: https://github.com/modelcontextprotocol/registry
- **MCP Spec**: https://spec.modelcontextprotocol.io
- **Issues**: https://github.com/modelcontextprotocol/registry/issues

---

**Ready to register?** Run the commands above to get your MCP listed on the official registry! 🚀
