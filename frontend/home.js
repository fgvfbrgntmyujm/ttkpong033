// เมื่อผู้ใช้คลิกปุ่ม "Go to Login"
document.getElementById("goToLogin").addEventListener("click", () => {
    window.location.href = "/login"; // เปลี่ยนไปที่หน้า Login
});

// เมื่อผู้ใช้คลิกปุ่ม "Learn More"
document.getElementById("about").addEventListener("click", () => {
    window.location.href = "https://cite.dpu.ac.th/ct/"; // เปิดลิงก์ไปยังเว็บไซต์
});
// Redirect to Personal Page
document.getElementById("goToPersonal").addEventListener("click", () => {
    window.location.href = "/personal";
});
