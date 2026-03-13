import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database("aptimaster.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id TEXT NOT NULL,
      subtopic_id TEXT NOT NULL,
      status TEXT DEFAULT 'not_started',
      score INTEGER DEFAULT 0,
      UNIQUE(topic_id, subtopic_id)
    )
  `);

  app.use(express.json());

  // API Routes
  app.get("/api/topics", (req, res) => {
    const topics = [
      {
        id: "quantitative",
        title: "Quantitative Aptitude",
        description: "Numerical ability and mathematical problem solving.",
        subtopics: [
          { id: "quant-basics", title: "Basic Arithmetic" },
          { id: "percentages", title: "Percentages" },
          { id: "time-and-work", title: "Time and Work" },
          { id: "time-distance", title: "Time, Speed and Distance" },
          { id: "probability", title: "Probability" },
          { id: "additional-aptitude", title: "Algebra & Numbers" },
          { id: "data-interpretation", title: "Data Interpretation" }
        ]
      },
      {
        id: "logical",
        title: "Logical Reasoning",
        description: "Analytical and logical thinking skills.",
        subtopics: [
          { id: "logical-basics", title: "Logical Deduction" },
          { id: "series", title: "Series Completion" },
          { id: "blood-relations", title: "Blood Relations" },
          { id: "coding-decoding", title: "Coding-Decoding" },
          { id: "puzzles", title: "Puzzles & Brain Teasers" },
          { id: "logical-analytical", title: "Analytical Reasoning" }
        ]
      },
      {
        id: "verbal",
        title: "Verbal Ability",
        description: "English language and comprehension skills.",
        subtopics: [
          { id: "synonyms", title: "Synonyms & Antonyms" },
          { id: "grammar", title: "Grammar & Error Detection" },
          { id: "reading-comprehension", title: "Reading Comprehension" }
        ]
      },
      {
        id: "technical",
        title: "Technical Knowledge",
        description: "Core Computer Science and Programming concepts.",
        subtopics: [
          { id: "programming-concepts", title: "Programming Fundamentals" },
          { id: "data-structures", title: "Data Structures" },
          { id: "algorithms", title: "Algorithms" },
          { id: "dbms", title: "Database Management" },
          { id: "networking", title: "Computer Networks" },
          { id: "os", title: "Operating Systems" },
          { id: "web-tech", title: "Web Technologies" },
          { id: "cloud-cyber", title: "Cloud & Cybersecurity" },
          { id: "software-eng", title: "Software Engineering" },
          { id: "ai-ml", title: "AI & Machine Learning" },
          { id: "advanced-prog", title: "Advanced Programming" },
          { id: "system-design", title: "System Design & DevOps" }
        ]
      }
    ];
    res.json(topics);
  });

  app.get("/api/progress", (req, res) => {
    const rows = db.prepare("SELECT * FROM progress").all();
    res.json(rows);
  });

  app.post("/api/progress", (req, res) => {
    const { topic_id, subtopic_id, status, score } = req.body;
    const stmt = db.prepare(`
      INSERT INTO progress (topic_id, subtopic_id, status, score)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(topic_id, subtopic_id) DO UPDATE SET
        status = excluded.status,
        score = excluded.score
    `);
    stmt.run(topic_id, subtopic_id, status, score);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
