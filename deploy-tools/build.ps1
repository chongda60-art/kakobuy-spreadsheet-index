$ErrorActionPreference = 'Stop'
$Project = Split-Path -Parent $PSScriptRoot
Set-Location $Project
& "$PSScriptRoot\preflight.ps1"
pnpm check
pnpm lint
pnpm build
Write-Host 'Build validation passed.'
