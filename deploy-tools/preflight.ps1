$ErrorActionPreference = 'Stop'
$Project = Split-Path -Parent $PSScriptRoot
Set-Location $Project
Write-Host "Project: $Project"
Write-Host "Node: $(node --version)"
Write-Host "Package manager: $(pnpm --version)"
git status --short
if (Test-Path '.env') { throw 'Refusing to continue with a root .env file in the deploy bundle.' }
Write-Host 'Preflight passed.'
