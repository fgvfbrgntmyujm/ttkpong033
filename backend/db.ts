import { Database } from "bun:sqlite";

// สร้างการเชื่อมต่อฐานข้อมูล
const db = new Database("keep-ball-game.db");

// เพิ่มคะแนน
export const addScore = async (userId: number, score: number) => {
    try {
        db.query("INSERT INTO scores (user_id, score) VALUES ($userId, $score);").run({
            $userId: userId,
            $score: score,
        });
        console.log("Score added to the database.");
    } catch (error) {
        console.error("Error adding score:", error);
        throw error;
    }
};

// ดึงคะแนน
export const getScores = async (userId: number) => {
    try {
        return db
            .query("SELECT score, date_played FROM scores WHERE user_id = $userId ORDER BY date_played DESC;")
            .all({ $userId: userId });
    } catch (error) {
        console.error("Error fetching scores:", error);
        throw error;
    }
};
