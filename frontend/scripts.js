let score = 0;
let isGameOver = false;

const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const ball = document.getElementById("ball");
const gameOverDisplay = document.getElementById("game-over");
const history = document.getElementById("history");

// อัปเดตคะแนนบนหน้าจอ
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// จบเกมและบันทึกคะแนน
async function gameOver() {
    isGameOver = true;
    gameOverDisplay.style.display = "block";

    try {
        const response = await fetch("/api/add-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: 1, score }),
        });

        if (response.ok) {
            console.log("Score saved successfully!");
            await fetchScores();
        } else {
            console.error("Failed to save score");
        }
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

// รีเซ็ตเกม
function resetGame() {
    score = 0;
    isGameOver = false;
    ballSpeedY = 0;
    ball.style.top = "50%";
    gameOverDisplay.style.display = "none";
    updateScore();
    requestAnimationFrame(updateBall);
}

// อัปเดตตำแหน่งลูกบอล
let ballSpeedY = 0;
let gravity = 0.5;

function updateBall() {
    if (isGameOver) return;

    let ballTop = ball.offsetTop + ballSpeedY;
    ballSpeedY += gravity;

    if (ballTop + ball.offsetHeight >= gameContainer.offsetHeight) {
        gameOver();
        return;
    }

    if (ballTop <= 0) {
        ballTop = 0;
        ballSpeedY = 5;
    }

    ball.style.top = `${ballTop}px`;
    requestAnimationFrame(updateBall);
}

// ดึงคะแนนทั้งหมดจากฐานข้อมูล
async function fetchScores() {
    try {
        const response = await fetch("/api/get-scores?userId=1");
        const scores = await response.json();

        history.innerHTML = "<h3>Score History</h3>";
        scores.forEach((s) => {
            const div = document.createElement("div");
            div.textContent = `Score: ${s.score}, Date: ${new Date(s.date_played).toLocaleString()}`;
            history.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching scores:", error);
    }
}

// เมื่อคลิกที่ลูกบอล
ball.addEventListener("mousedown", () => {
    if (isGameOver) {
        resetGame();
    } else {
        ballSpeedY = -7;
        score++;
        updateScore();

        // เปลี่ยนรูปพื้นหลัง
        fetch(`https://picsum.photos/seed/${Math.random()}/800/600`)
            .then((response) => {
                gameContainer.style.backgroundImage = `url(${response.url})`;
                gameContainer.style.backgroundSize = "cover";
                gameContainer.style.transition = "background 0.5s ease-in-out";
            })
            .catch((error) => console.error("Error fetching background image:", error));
    }
});

// เริ่มเกมและโหลดคะแนน
resetGame();
fetchScores();
