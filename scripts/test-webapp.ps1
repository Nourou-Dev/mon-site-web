$base = "http://localhost:3001"

Write-Host "=== 1. Testing Page Endpoints ==="
$pages = @("/app", "/app/login", "/app/leads", "/app/cookies", "/app/projets", "/app/messages")
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

Write-Host "`n=== 4. Testing Leads & Cookies API (with Admin Session) ==="
try {
    $leadsRes = Invoke-RestMethod -Uri ($base + "/api/app/leads") -Method Get -WebSession $webSession
    Write-Host "CRM Inquiries Count: $($leadsRes.inquiries.Count) | Newsletter Subscribers: $($leadsRes.subscribers.Count)"

    $consentPost = @{
        choice = "accepted_all"
        analytics = $true
        experience = $true
    } | ConvertTo-Json
    $null = Invoke-RestMethod -Uri ($base + "/api/app/cookies") -Method Post -Body $consentPost -ContentType "application/json"

    $cookieRes = Invoke-RestMethod -Uri ($base + "/api/app/cookies") -Method Get -WebSession $webSession
    Write-Host "Cookie Logs Total: $($cookieRes.stats.total) | Accepted: $($cookieRes.stats.accepted) | Acceptance Rate: $($cookieRes.stats.acceptanceRate)%"
} catch {
    Write-Host "CRM/Cookies API error: $($_.Exception.Message)"
}

Write-Host "`n=== 5. Testing Projects API & Milestones Update ==="
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
            progress = 75
        } | ConvertTo-Json

        $patchRes = Invoke-RestMethod -Uri ($base + "/api/app/projects") -Method Patch -Body $patchBody -ContentType "application/json" -WebSession $webSession
        Write-Host "Milestone Toggle Success: $($patchRes.success) | New Project Progress: $($patchRes.project.progress)%"
    }

    Write-Host "`n=== 6. Testing Messages API ==="
    $msgPost = @{
        projectId = $firstProj.id
        content = "Test direct : tout fonctionne parfaitement dans le nouveau tableau de bord et la messagerie !"
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
