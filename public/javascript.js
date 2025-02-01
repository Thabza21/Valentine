function sendEmail(choice) {
    fetch("/send-email", {  // 🔴 Change from "/" to "/send-email"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice: choice })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}


