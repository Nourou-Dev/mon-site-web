$base = "http://localhost:3001"

Write-Host "=== 1. Testing Page Endpoints (including /admin) ==="
$pages = @("/admin", "/app/admin", "/app", "/app/login", "/app/leads", "/app/cookies", "/app/projets", "/app/messages", "/app/parametres")
foreach ($page in $pages) {
    try {
        $res = Invoke-WebRequest -Uri ($base + $page) -UseBasicParsing -TimeoutSec 5
        Write-Host "Page $page -> Status: $($res.StatusCode)"
    } catch {
        Write-Host "Page $page -> Error: $($_.Exception.Message)"
    }
}

Write-Host "`n=== 2. Testing Subdomain Middleware Rewrite ==="
try {
    $subReq = [System.Net.HttpWebRequest]::Create($base + "/")
    $subReq.Host = "app.nomdusite.com"
    $subReq.Method = "GET"
    $subRes = $subReq.GetResponse()
    Write-Host "Subdomain app.nomdusite.com/ -> Status: $([int]$subRes.StatusCode)"
    $subRes.Close()
} catch {
    Write-Host "Subdomain test error: $($_.Exception.Message)"
}

Write-Host "`n=== 3. Testing Dedicated Admin Login (/admin) ==="
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

Write-Host "`n=== 4. Testing Direct 1-Click Admin Access ==="
$directAdminBody = @{
    action = "admin_login"
    directAdmin = $true
} | ConvertTo-Json

try {
    $directRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $directAdminBody -ContentType "application/json" -SessionVariable adminSession
    Write-Host "Direct Admin Access: $($directRes.success) | User: $($directRes.user.name) | Role: $($directRes.user.role)"
} catch {
    Write-Host "Direct Admin error: $($_.Exception.Message)"
}

Write-Host "`n=== 5. Testing Profile & Settings API (as Admin) ==="
try {
    $getProfile = Invoke-RestMethod -Uri ($base + "/api/app/profile") -Method Get -WebSession $adminSession
    Write-Host "Profile Fetch Success: $($getProfile.success) | User: $($getProfile.user.name) | Phone: $($getProfile.user.phone)"

    $updateProfileBody = @{
        name = "Nourou Dine AMANDOU"
        company = "Studio Webdesign & Dev"
        phone = "+229 01 61 38 07 98"
    } | ConvertTo-Json

    $patchProfile = Invoke-RestMethod -Uri ($base + "/api/app/profile") -Method Patch -Body $updateProfileBody -ContentType "application/json" -WebSession $adminSession
    Write-Host "Profile Update Success: $($patchProfile.success) | New Company: $($patchProfile.user.company)"
} catch {
    Write-Host "Profile API error: $($_.Exception.Message)"
}

Write-Host "`n=== 6. Testing Client Authentication (Strictly Client Role) ==="
$clientLoginBody = @{
    action = "login"
    email = "direction@cliniquesanteplus.com"
    password = "password123"
} | ConvertTo-Json

try {
    $clientAuthRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $clientLoginBody -ContentType "application/json" -SessionVariable clientSession
    Write-Host "Client Login Success: $($clientAuthRes.success) | User: $($clientAuthRes.user.name) | Role: $($clientAuthRes.user.role)"
} catch {
    Write-Host "Client Auth error: $($_.Exception.Message)"
}

Write-Host "`n=== 7. Testing Projects API & Milestones Update ==="
try {
    $projRes = Invoke-RestMethod -Uri ($base + "/api/app/projects") -Method Get -WebSession $adminSession
    Write-Host "Projects Count: $($projRes.projects.Count)"
    if ($projRes.projects.Count -gt 0) {
        $p = $projRes.projects[0]
        Write-Host "Active Project: $($p.title) | Current Progress: $($p.progress)%"

        # Toggle first milestone
        $toggleBody = @{
            projectId = $p.id
            milestoneId = $p.milestones[0].id
            completed = $true
        } | ConvertTo-Json
        $patchProj = Invoke-RestMethod -Uri ($base + "/api/app/projects") -Method Patch -Body $toggleBody -ContentType "application/json" -WebSession $adminSession
        Write-Host "Milestone Toggle Success: $($patchProj.success) | New Project Progress: $($patchProj.project.progress)%"
    }
} catch {
    Write-Host "Projects API error: $($_.Exception.Message)"
}

Write-Host "`n=== 8. Testing Messages API ==="
try {
    $msgSendBody = @{
        projectId = "prj_demo_1"
        content = "Message test direct administrateur sécurisé."
    } | ConvertTo-Json
    $sendRes = Invoke-RestMethod -Uri ($base + "/api/app/messages") -Method Post -Body $msgSendBody -ContentType "application/json" -WebSession $adminSession
    Write-Host "Message Sent: $($sendRes.success)"

    $getMsgs = Invoke-RestMethod -Uri ($base + "/api/app/messages?projectId=prj_demo_1") -Method Get -WebSession $adminSession
    Write-Host "Total Messages in Thread: $($getMsgs.messages.Count)"
} catch {
    Write-Host "Messages API error: $($_.Exception.Message)"
}
