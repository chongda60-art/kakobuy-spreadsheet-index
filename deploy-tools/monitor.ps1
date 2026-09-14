param(
  [string]$BaseUrl = "https://kakobuyspreadsheetindex.com",
  [string]$OutputDirectory = "E:\seo\reports\kakobuy-spreadsheet-index\monitor"
)
$ErrorActionPreference = "Stop"
$Project = Split-Path -Parent $PSScriptRoot
Set-Location $Project
$env:KAKOBUY_BASE_URL = $BaseUrl
$env:KAKOBUY_MONITOR_OUTPUT = $OutputDirectory
node scripts/monitor-site.cjs
