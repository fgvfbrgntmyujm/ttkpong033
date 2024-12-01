คำสั่งพร้อมคำอธิบาย
อัปเดตรายการแพ็กเกจ

bash
คัดลอกโค้ด
sudo apt update
เพื่อให้ระบบสามารถเข้าถึงรายการแพ็กเกจล่าสุด
ติดตั้งแพ็กเกจที่จำเป็น

bash
คัดลอกโค้ด
sudo apt install apt-transport-https ca-certificates curl software-properties-common
ติดตั้งเครื่องมือที่ช่วยจัดการแหล่งข้อมูลและการเชื่อมต่อ HTTPS
เพิ่ม Docker GPG Key

bash
คัดลอกโค้ด
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
เพื่อให้ระบบสามารถตรวจสอบความน่าเชื่อถือของ Docker ได้
เพิ่ม Docker APT Repository

bash
คัดลอกโค้ด
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
เพิ่มแหล่งที่มาของ Docker ลงใน APT
อัปเดตรายการแพ็กเกจอีกครั้ง

bash
คัดลอกโค้ด
sudo apt update
เพื่อดึงรายการแพ็กเกจที่รวม Docker เข้ามาด้วย
ติดตั้ง Docker Engine

bash
คัดลอกโค้ด
sudo apt install docker-ce
ติดตั้ง Docker Engine สำหรับการใช้งานคอนเทนเนอร์
ตรวจสอบการติดตั้ง Docker

bash
คัดลอกโค้ด
docker --version
ตรวจสอบว่า Docker ติดตั้งสำเร็จและพร้อมใช้งาน
ติดตั้ง Docker Compose เวอร์ชันล่าสุด

bash
คัดลอกโค้ด
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
ดาวน์โหลด Docker Compose เวอร์ชันล่าสุดจาก GitHub
ให้สิทธิ์การรันไฟล์ Docker Compose

bash
คัดลอกโค้ด
sudo chmod +x /usr/local/bin/docker-compose
เปลี่ยนสิทธิ์ของไฟล์เพื่อให้สามารถรันได้
ตรวจสอบการติดตั้ง Docker Compose

bash
คัดลอกโค้ด
docker-compose --version
ตรวจสอบว่า Docker Compose ติดตั้งสำเร็จ
ติดตั้ง Git

bash
คัดลอกโค้ด
sudo apt install git
ติดตั้ง Git สำหรับการจัดการโค้ด
ตรวจสอบการติดตั้ง Git

bash
คัดลอกโค้ด
git --version

<img src="./images/1.JPG" width="100%" height="100%">

หน้า Home 


<img src="./images/2.JPG" width="100%" height="100%">

หน้า  about 

<img src="./images/3.JPG" width="100%" height="100%">

