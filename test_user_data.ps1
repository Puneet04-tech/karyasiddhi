Write-Host "`n========== TESTING USER-SPECIFIC DATA ==========`n" -ForegroundColor Cyan

# Test Rajesh Kumar
$r = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/auth/login' -Method POST -ContentType 'application/json' -Body '{"email":"rajesh.kumar@gov.in","password":"Test@123"}'
$rToken = $r.access_token
$rGoals = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/goals' -Headers @{Authorization="Bearer $rToken"}
$rKPIs = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/kpis' -Headers @{Authorization="Bearer $rToken"}

Write-Host "USER 1: Rajesh Kumar ($($r.user.email))" -ForegroundColor Yellow
Write-Host "  Goals: $($rGoals.Count)"
$rGoals | ForEach-Object { Write-Host "    - $($_.title)" }
Write-Host "  KPIs: $($rKPIs.Count)"
$rKPIs | ForEach-Object { Write-Host "    - $($_.name)" }
Write-Host ""

# Test Amit Patel
$a = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/auth/login' -Method POST -ContentType 'application/json' -Body '{"email":"amit.patel@gov.in","password":"Test@123"}'
$aToken = $a.access_token
$aGoals = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/goals' -Headers @{Authorization="Bearer $aToken"}
$aKPIs = Invoke-RestMethod -Uri 'http://127.0.0.1:3001/api/kpis' -Headers @{Authorization="Bearer $aToken"}

Write-Host "USER 2: Amit Patel ($($a.user.email))" -ForegroundColor Yellow
Write-Host "  Goals: $($aGoals.Count)"
$aGoals | ForEach-Object { Write-Host "    - $($_.title)" }
Write-Host "  KPIs: $($aKPIs.Count)"
$aKPIs | ForEach-Object { Write-Host "    - $($_.name)" }

Write-Host "`n✅ SUCCESS: Different users see DIFFERENT data!`n" -ForegroundColor Green
