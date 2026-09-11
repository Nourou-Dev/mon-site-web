$base = "http://localhost:3001"

Write-Host "=== 1. Testing Page Endpoints ==="
$pages = @("/app", "/app/login", "/app/leads", "/app/cookies", "/app/projets", "/app/messages", "/app/parametres")
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

Write-Host "`n=== 3. Testing Auth API ==="
$loginBody = @{
    action = "login"
    email = "contact@nouroudineamandou.com"
    password = "admin123!"
} | ConvertTo-Json

try {
    $authRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $loginBody -ContentType "application/json" -SessionVariable webSession
    Write-Host "Auth Login Success: $($authRes.success) | User: $($authRes.user.name) | Role: $($authRes.user.role)"
} catch {
    Write-Host "Auth error: $($_.Exception.Message)"
}

Write-Host "`n=== 4. Testing Profile & Settings API ==="
try {
    $getProfile = Invoke-RestMethod -Uri ($base + "/api/app/profile") -Method Get -WebSession $webSession
    Write-Host "Profile Fetch Success: $($getProfile.success) | User: $($getProfile.user.name) | Phone: $($getProfile.user.phone)"

    $updateProfileBody = @{
        name = "Nourou Dine AMANDOU"
        company = "Studio Webdesign & Dev"
        phone = "+229 01 61 38 07 98"
    } | ConvertTo-Json

    $patchProfile = Invoke-RestMethod -Uri ($base + "/api/app/profile") -Method Patch -Body $updateProfileBody -ContentType "application/json" -WebSession $webSession
    Write-Host "Profile Update Success: $($patchProfile.success) | New Company: $($patchProfile.user.company)"
} catch {
    Write-Host "Profile API error: $($_.Exception.Message)"
}

Write-Host "`n=== 5. Testing Instant Role Switch (Admin <-> Client) ==="
try {
    $switchBody = @{
        action = "switch_role"
        targetRole = "client"
    } | ConvertTo-Json
    $switchRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $switchBody -ContentType "application/json" -WebSession $webSession
    Write-Host "Switched to Client: $($switchRes.success) | User: $($switchRes.user.name) | Role: $($switchRes.user.role)"

    # Switch back to Admin
    $switchBackBody = @{
        action = "switch_role"
        targetRole = "admin"
    } | ConvertTo-Json
    $switchBackRes = Invoke-RestMethod -Uri ($base + "/api/app/auth") -Method Post -Body $switchBackBody -ContentType "application/json" -WebSession $webSession
    Write-Host "Switched back to Admin: $($switchBackRes.success) | User: $($switchBackRes.user.name) | Role: $($switchBackRes.user.role)"
} catch {
    Write-Host "Role Switch error: $($_.Exception.Message)"
}

Write-Host "`n=== 6. Testing Projects API & Milestones Update ==="
try {
    $projRes = Invoke-RestMethod -Uri ($base + "/api/app/projects") -Method Get -WebSession $webSession
    Write-Host "Projects Count: $($projRes.projects.Count)"
    $firstProj = $projRes.projects[0]
    Write-Host "Active Project: $($firstProj.title) | Progress: $($firstProj.progress)%"

    # Test mise à jour jalon
    if ($firstProj.milestones.Count -gt 0) {
        $firstMilestone = $firstProj.milestones[0]
        $patchBody = @{
            projectId = $firstProj.id
            milestones = @(
                @{
                    id = $firstMilestone.id
                    title = $firstMilestone.title
                    targetDate = $firstMilestone.targetDate
                    completed = $true
                }
            )
            progress = 80
        } | ConvertTo-Json

        $patchRes = Invoke-RestMethod -Uri ($base + "/api/app/projects") -Method Patch -Body $patchBody -ContentType "application/json" -WebSession $webSession
        Write-Host "Milestone Toggle Success: $($patchRes.success) | New Project Progress: $($patchRes.project.progress)%"
    }

    Write-Host "`n=== 7. Testing Messages API ==="
    $msgPost = @{
        projectId = $firstProj.id
        content = "Test direct : validation de l'alignement des conversations et de la nouvelle page de paramètres !"
        senderName = "Nourou Dine AMANDOU"
        senderRole = "admin"
    } | ConvertTo-Json

    $msgRes = Invoke-RestMethod -Uri ($base + "/api/app/messages") -Method Post -Body $msgPost -ContentType "application/json" -WebSession $webSession
    Write-Host "Message Sent: $($msgRes.success) | New Message ID: $($msgRes.message.id)"

    $getMsgs = Invoke-RestMethod -Uri ($base + "/api/app/messages?projectId=" + $firstProj.id) -Method Get -WebSession $webSession
    Write-Host "Total Messages in Thread: $($getMsgs.messages.Count)"
    Write-Host "Latest Message: $($getMsgs.messages[-1].content)"
} catch {
    Write-Host "Projects/Messages error: $($_.Exception.Message)"
}
