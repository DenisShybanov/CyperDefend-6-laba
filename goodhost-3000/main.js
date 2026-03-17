// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`/login?username=${username}&password=${password}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("status").innerText = data;
            location.reload();
        });
}

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    document.cookie = "SessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
});

// EMAILS
fetch("/api/emails")
    .then(res => res.json())
    .then(emails => {
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");

        emails.forEach(email => {
            const item = document.createElement("div");
            item.className = "email-item";
            item.textContent = `${email.sender}: ${email.subject}`;

            item.addEventListener("click", () => {
                main.innerHTML = `<h3>${email.subject}</h3><p>${email.body}</p>`;
            });

            sidebar.appendChild(item);
        });
    })
    .catch(err => console.error("Error fetching emails:", err));