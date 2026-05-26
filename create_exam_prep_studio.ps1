$ProjectRoot = "C:\ExamPrepStudio"
$SourceRoot = Join-Path $PSScriptRoot "exam-prep-studio-refined"
New-Item -ItemType Directory -Force -Path $ProjectRoot | Out-Null
Copy-Item -Path "$SourceRoot\*" -Destination $ProjectRoot -Recurse -Force
Write-Host "Project created: $ProjectRoot" -ForegroundColor Green
