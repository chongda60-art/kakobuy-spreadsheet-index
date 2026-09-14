$ErrorActionPreference = 'Stop'
$Project = Split-Path -Parent $PSScriptRoot
Set-Location $Project
$node = (Get-Command node).Source
& $node scripts/verify-site.cjs
