(function() {
    const mode = window.WEATHER_MODE || "normal"; // беремо глобально, або можна інший варіант

    if (mode === "breach1") {
        alert("HACKED: I can see your cookies: " + document.cookie + 
              " and User: " + document.getElementById('username').innerText);
    } else {
        console.log("Current temperature: 5°C");
    }
})();