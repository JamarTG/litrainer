import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import cors from "cors";
import { fileURLToPath } from "url";  
import path,{dirname} from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json()); 


app.post("/evaluate", (req, res) => {
  const { fen } = req.body;

  const pythonExecutable = "python"; 
  const scriptPath = path.join(__dirname, "engine.py");

  exec(`${pythonExecutable} ${scriptPath} "${fen}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`); 
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`); 
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    // console.log(`Stockfish output: ${stdout}`); 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.json(JSON.parse(stdout)); 
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});