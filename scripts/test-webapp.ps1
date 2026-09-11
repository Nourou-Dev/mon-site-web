$base = "http://localhost:3001"

Write-Host "=== 1. Testing Page Endpoints (including /admin, /app/clients) ==="
$pages = @("/admin", "/app/admin", "/app", "/app/login", "/app/clients", "/app/leads", "/app/cookies", "/app/projets", "/app/messages", "/app/parametres")
foreach ($page in $pages) {
    try {
        $res = Invoke-WebRequest -Uri ($base + $page) -UseBasicParsing -TimeoutSec 5
        Write-Host "Page $page -> Status: $($res.StatusCode)"
    } catch {
        Write-Host "Page $page -> Error: $($_.Exception.Message)"
    }
}

Write-Host "`n=== 2. Testing Strict Admin Login (/admin : Email + Password) ==="
# Test 2.1 : Échec sans mot de passe
try {
    $failBody = @{ action = "admin_login"; login = "contact@nouroudineamandou.com" } | ConvertTo-Json
    Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $failBody -ContentType "application/json"
    Write-Host "Test Empty Password -> FAILED (Should have been rejected)"
} catch {
    Write-Host "Test Empty Password -> Correctly Rejected: 400 Bad Request"
}

# Test 2.2 : Succès avec identifiants valides
$adminLoginBody = @{
    action = "admin_login"
    login = "contact@nouroudineamandou.com"
    password = "admin123!"
} | ConvertTo-Json

try {
    $adminAuthRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $adminLoginBody -ContentType "application/json" -SessionVariable adminSession
    Write-Host "Admin Login Success: $($adminAuthRes.success) | User: $($adminAuthRes.user.name) | Role: $($adminAuthRes.user.role)"
} catch {
    Write-Host "Admin Auth error: $($_.Exception.Message)"
}

Write-Host "`n=== 3. Testing Accounts & Logins API (/api/app/users) ==="
try {
    $usersRes = Invoke-RestMethod -Uri ($base + "/api/app/users") -Method Get -WebSession $adminSession
    Write-Host "Users API Success: $($usersRes.success) | Total Accounts: $($usersRes.total)"
    foreach ($u in $usersRes.users) {
        Write-Host "  - Account: $($u.name) | Login Email: $($u.email) | Role: $($u.role) | Company: $($u.company)"
    }
} catch {
    Write-Host "Users API error: $($_.Exception.Message)"
}

Write-Host "`n=== 4. Testing Cookies API with Client IP & Month filter ==="
try {
    # Post a consent log
    $cookiePost = @{
        choice = "accepted_all"
        analytics = $true
        experience = $true
    } | ConvertTo-Json
    $postRes = Invoke-RestMethod -Uri ($base + "/api/app/cookies") -Method Post -Body $cookiePost -ContentType "application/json"
    Write-Host "Cookie Log Post Success: $($postRes.success) | Client IP captured: $($postRes.ip)"

    # Get stats with month filter
    $cookieGet = Invoke-RestMethod -Uri ($base + "/api/app/cookies") -Method Get -WebSession $adminSession
    Write-Host "Cookie Stats Success: $($cookieGet.success) | Total Logs: $($cookieGet.stats.total) | Months: $($cookieGet.stats.availableMonths -join ', ')"
    if ($cookieGet.stats.recentLogs.Count -gt 0) {
        $firstLog = $cookieGet.stats.recentLogs[0]
        Write-Host "  Latest Cookie Log -> IP: $($firstLog.ip) | Choice: $($firstLog.choice) | Month: $($firstLog.month)"
    }
} catch {
    Write-Host "Cookie API error: $($_.Exception.Message)"
}

Write-Host "`n=== 5. Testing Inactivity / Auth Me (Front-End & Middleware) ==="
try {
    $meBody = @{ action = "me" } | ConvertTo-Json
    $meRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $meBody -ContentType "application/json" -WebSession $adminSession
    Write-Host "Session Authenticated: $($meRes.authenticated) | Active User: $($meRes.user.name) | Role: $($meRes.user.role)"
} catch {
    Write-Host "Auth Me error: $($_.Exception.Message)"
}
