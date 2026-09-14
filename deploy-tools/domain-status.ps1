param([string]$Domain = 'kakobuyspreadsheetindex.com')
$ErrorActionPreference = 'Stop'
Write-Host "Vercel apex verification:"
pnpm dlx vercel domains verify $Domain
Write-Host "Vercel www verification:"
pnpm dlx vercel domains verify "www.$Domain"
Write-Host "DNS lookup:"
Resolve-DnsName $Domain -ErrorAction SilentlyContinue | Select-Object Name,Type,IPAddress,NameHost
Resolve-DnsName "www.$Domain" -ErrorAction SilentlyContinue | Select-Object Name,Type,IPAddress,NameHost
Write-Host "This script is read-only. It does not edit registrar DNS records."
