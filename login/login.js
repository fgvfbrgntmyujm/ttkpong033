document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();

    if (!username) {
        alert("Please enter a username.");
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = result.redirect; // เปลี่ยนเส้นทางไปยังหน้าเกม
        } else {
            alert(result.error || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred while logging in. Please try again.");
    }
});
