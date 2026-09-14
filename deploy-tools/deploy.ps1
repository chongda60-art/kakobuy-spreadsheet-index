param([switch]$Production)
$ErrorActionPreference = 'Stop'
$Project = Split-Path -Parent $PSScriptRoot
Set-Location $Project
& "$PSScriptRoot\build.ps1"
if ($Production) { pnpm dlx vercel --prod --yes } else { pnpm dlx vercel --yes }
