import { serve } from "bun";
import { addScore, getScores } from "./db"; // ฟังก์ชันจัดการฐานข้อมูล

// Static Files Configuration
const staticFiles: Record<string, { file: Bun.FileBlob; type: string }> = {
  "/": { file: Bun.file("../frontend/home.html"), type: "text/html" },
  "/home.css": { file: Bun.file("../frontend/home.css"), type: "text/css" },
  "/home.js": { file: Bun.file("../frontend/home.js"), type: "application/javascript" },
  "/login": { file: Bun.file("../login/login.html"), type: "text/html" },
  "/login.css": { file: Bun.file("../login/login.css"), type: "text/css" },
  "/login.js": { file: Bun.file("../login/login.js"), type: "application/javascript" },
  "/game": { file: Bun.file("../frontend/index.html"), type: "text/html" },
  "/styles.css": { file: Bun.file("../frontend/styles.css"), type: "text/css" },
  "/scripts.js": { file: Bun.file("../frontend/scripts.js"), type: "application/javascript" },
  "/personal": { file: Bun.file("../personal/personal.html"), type: "text/html" },
  "/personal.css": { file: Bun.file("../personal/personal.css"), type: "text/css" },
  "/personal.js": { file: Bun.file("../personal/personal.js"), type: "application/javascript" },
};

// In-Memory User Storage
const users: Record<string, boolean> = {};

// Serve Static Files
function serveStatic(pathname: string): Response | null {
  const file = staticFiles[pathname];
  if (file) {
    return new Response(file.file, { headers: { "Content-Type": file.type } });
  }
  return null;
}

// Serve Images
function serveImages(pathname: string): Response | null {
  if (pathname.startsWith("/images/")) {
    try {
      const filePath = `../${pathname}`;
      const file = Bun.file(filePath);
      const type = pathname.endsWith(".jpg")
        ? "image/jpeg"
        : pathname.endsWith(".png")
        ? "image/png"
        : "application/octet-stream";

      return new Response(file, { headers: { "Content-Type": type } });
    } catch (error) {
      console.error("File not found:", pathname);
      return new Response("File not found", { status: 404 });
    }
  }
  return null;
}

// API Handlers
async function handleLogin(req: Request): Promise<Response> {
  try {
    const { username } = await req.json();
    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    users[username] = true;
    console.log(`User logged in: ${username}`);
    return new Response(JSON.stringify({ message: "Login successful", redirect: "/game" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleAddScore(req: Request): Promise<Response> {
  try {
    const { userId, score } = await req.json();
    if (!userId || !score) {
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await addScore(userId, score);
    return new Response(JSON.stringify({ message: "Score added successfully!" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Add score error:", error);
    return new Response(JSON.stringify({ error: "Failed to add score" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleGetScores(req: Request): Promise<Response> {
  try {
    const userId = parseInt(new URL(req.url).searchParams.get("userId") || "0", 10);
    const scores = await getScores(userId);
    return new Response(JSON.stringify(scores), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get scores error:", error);
    return new Response(JSON.stringify({ error: "Failed to get scores" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Start Server
 serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);

    // Static and Image Handling
    const staticResponse = serveStatic(url.pathname) || serveImages(url.pathname);
    if (staticResponse) return staticResponse;

    // API Routing
    if (url.pathname === "/api/login" && req.method === "POST") return handleLogin(req);
    if (url.pathname === "/api/add-score" && req.method === "POST") return handleAddScore(req);
    if (url.pathname === "/api/get-scores" && req.method === "GET") return handleGetScores(req);

    // Not Found Response
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server is running at http://localhost:3000");
