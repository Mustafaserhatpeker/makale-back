import WebSocket, { WebSocketServer } from "ws";
import { spawn } from "child_process";
import File from "../models/File.js";
const wss = new WebSocketServer({ port: 5002 });

wss.on("connection", (ws) => {
  console.log("Yeni bir istemci bağlandı.");

  ws.on("message", async (message) => {
    const { userId } = JSON.parse(message);

    const userFile = await File.findOne({ uploadedBy: userId });

    if (!userFile) {
      ws.send(
        JSON.stringify({ status: "error", message: "Dosya bulunamadı." })
      );
      return;
    }

    const filePath = userFile.filePath;
    const pythonScriptPath =
      "/Users/mustafaserhatpeker/Desktop/text_pr/test.py";

    ws.send(
      JSON.stringify({ status: "processing", message: "İşlem başlatılıyor..." })
    );

    // Python scriptini çalıştır
    const pythonProcess = spawn("python3", [pythonScriptPath, filePath]);

    pythonProcess.stdout.on("data", (data) => {
      ws.send(JSON.stringify({ status: "progress", message: data.toString() }));
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Hata:", data.toString());
      ws.send(JSON.stringify({ status: "error", message: data.toString() }));
    });

    pythonProcess.on("close", (code) => {
      ws.send(
        JSON.stringify({
          status: "completed",
          message: "İşlem tamamlandı!",
          exitCode: code,
        })
      );
    });
  });

  ws.on("close", () => {
    console.log("İstemci bağlantıyı kapattı.");
  });
});

console.log("WebSocket sunucusu 5002 portunda çalışıyor...");
