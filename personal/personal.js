document.addEventListener("DOMContentLoaded", () => {
    const user = {
      name: "กิตติพงศ์ ใจชื้น ",
      email: "Kittipong@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Springfield",
    };
  
    // อัปเดตข้อมูลผู้ใช้ในหน้า
    document.getElementById("name").textContent = user.name;
    document.getElementById("email").textContent = user.email;
    document.getElementById("phone").textContent = user.phone;
    document.getElementById("address").textContent = user.address;
  });
  