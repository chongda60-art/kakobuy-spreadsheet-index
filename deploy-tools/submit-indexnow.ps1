param(
  [switch]$Submit,
  [string]$SiteUrl = "https://kakobuyspreadsheetindex.com",
  [string]$Key = "35545d11a53a44a8b67dfbb6d2d0a60a",
  [string]$OutputDirectory = "E:\seo\reports\kakobuy-spreadsheet-index"
)
$ErrorActionPreference = "Stop"
if (-not $Submit) { throw "Dry run only. Re-run with -Submit to send each URL once." }
$urls = @(
  "$SiteUrl/",
  "$SiteUrl/questions",
  "$SiteUrl/questions/where-to-see-kakobuy-qc-photos",
  "$SiteUrl/questions/kakobuy-product-link-not-working",
  "$SiteUrl/questions/choose-kakobuy-spreadsheet-with-qc-photos"
)
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$results = foreach ($endpoint in @("https://api.indexnow.org/indexnow", "https://yandex.com/indexnow")) {
  $body = @{ host = ([Uri]$SiteUrl).Host; key = $Key; keyLocation = "$SiteUrl/$Key.txt"; urlList = $urls } | ConvertTo-Json -Depth 4
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Method Post -Uri $endpoint -ContentType "application/json; charset=utf-8" -Body $body -TimeoutSec 30
    [ordered]@{ endpoint = $endpoint; status = [int]$response.StatusCode; success = $true; urlCount = $urls.Count }
  } catch {
    $status = $null
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) { $status = [int]$_.Exception.Response.StatusCode }
    [ordered]@{ endpoint = $endpoint; status = $status; success = $false; urlCount = $urls.Count; error = $_.Exception.Message }
  }
}
$report = [ordered]@{ submittedAt = (Get-Date).ToString("s"); siteUrl = $SiteUrl; urlCount = $urls.Count; urls = $urls; results = $results }
$path = Join-Path $OutputDirectory "KAKOBUY_INDEXNOW_SUBMISSION_20260914.json"
$report | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 $path
$path
