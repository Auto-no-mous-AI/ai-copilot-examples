param()

$ErrorActionPreference = 'Stop'

$examplesRoot = Split-Path -Parent $PSScriptRoot
$workspaceRoot = Split-Path -Parent $examplesRoot
$sdkRepo = Join-Path $workspaceRoot 'ai-copilot-sdk'
$reactSdkRepo = Join-Path $workspaceRoot 'ai-copilot-sdk-react'
$angularSdkRepo = Join-Path $workspaceRoot 'ai-copilot-sdk-angular'
$infraRepo = Join-Path $workspaceRoot 'ai-copilot-infra'

$requiredRepos = @($sdkRepo, $reactSdkRepo, $angularSdkRepo, $infraRepo)
foreach ($repo in $requiredRepos) {
  if (-not (Test-Path $repo)) {
    throw "Expected sibling repo not found: $repo"
  }
}

Write-Host 'Installing and building SDK repositories...'
foreach ($repo in @($sdkRepo, $reactSdkRepo, $angularSdkRepo)) {
  Push-Location $repo
  try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed in $repo" }
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed in $repo" }
  } finally {
    Pop-Location
  }
}

Write-Host 'Generating local infra secrets manifest...'
Push-Location $infraRepo
try {
  powershell -ExecutionPolicy Bypass -File .\scripts\generate-secrets.ps1 -OutputPath 'k8s/base/ai-copilot-secrets.generated.yaml'
  if ($LASTEXITCODE -ne 0) { throw 'Failed to generate infra secrets manifest.' }
} finally {
  Pop-Location
}

Write-Host 'Installing example applications...'
foreach ($example in @('vanilla-example', 'react-example', 'angular-example')) {
  $examplePath = Join-Path $examplesRoot $example
  Push-Location $examplePath
  try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed in $examplePath" }
  } finally {
    Pop-Location
  }
}

Write-Host ''
Write-Host 'Bootstrap completed.'
Write-Host 'Next commands:'
Write-Host '  npm run mock:api'
Write-Host '  cd vanilla-example && npm run dev'
Write-Host '  cd react-example && npm run dev'
Write-Host '  cd angular-example && npm start'
