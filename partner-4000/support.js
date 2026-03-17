(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const chatBtn = document.createElement("button");
        chatBtn.textContent = "Chat with Support";
        chatBtn.style.position = "fixed";
        chatBtn.style.bottom = "20px";
        chatBtn.style.right = "20px";
        chatBtn.style.zIndex = "9999";

        document.body.appendChild(chatBtn);

        chatBtn.addEventListener("click", () => {
            fetch("http://localhost:4000/new-messages")
                .then(res => res.json())
                .then(data => {
                    alert(`You have ${data.count} new messages`);
                })
                .catch(err => console.error("Error fetching messages:", err));
        });
    });
})();