import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import cors from "cors";
import { fileURLToPath } from "url";  
import path,{dirname} from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = import.meta.VITE_PORT ;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 


app.post("/evaluate", (req, res) => {
  const { fen } = req.body;

  const pythonExecutable = "python"; 
  const scriptPath = path.join(__dirname, "engine.py");

  exec(`${pythonExecutable} ${scriptPath} "${fen}"`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send({ error: error.message });
      return;
    }
    if (stderr) {
      res.status(500).send({ error: stderr });
      return;
    }
    res.send({ result: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});