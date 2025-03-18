import WebSocket, { WebSocketServer } from "ws";
import mongoose from "mongoose";
import { spawn } from "child_process";
import File from "../models/File.js";

// Bağlı olan tüm istemcileri saklamak için bir dizi
const clients = new Set();

const wss = new WebSocketServer({ port: 5002 });

wss.on("connection", (ws) => {
  console.log("Yeni bir istemci bağlandı.");
  clients.add(ws); // İstemciyi sakla

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "file_process") {
        // ✅ Dosya işleme kodu
        if (!mongoose.Types.ObjectId.isValid(data.fileId)) {
          ws.send(
            JSON.stringify({ status: "error", message: "Invalid ObjectId." })
          );
          return;
        }

        const userFile = await File.findById(data.fileId);
        if (!userFile) {
          ws.send(
            JSON.stringify({ status: "error", message: "Dosya bulunamadı." })
          );
          return;
        }

        const filePath = userFile.filePath;
        const pythonScriptPath =
          "/Users/mustafaserhatpeker/Desktop/text_pr/main.py";

        ws.send(
          JSON.stringify({
            status: "processing",
            message: "İşlem başlatılıyor...",
          })
        );

        const pythonProcess = spawn(
          "/Users/mustafaserhatpeker/Desktop/text_pr/myenv/bin/python",
          [pythonScriptPath, filePath]
        );

        pythonProcess.stdout.on("data", (data) => {
          ws.send(
            JSON.stringify({ status: "progress", message: data.toString() })
          );
        });

        pythonProcess.stderr.on("data", (data) => {
          ws.send(
            JSON.stringify({ status: "error", message: data.toString() })
          );
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
      } else if (data.type === "chat") {
        // ✅ Mesajlaşma kodu
        const chatMessage = {
          sender: data.sender,
          message: data.message,
          timestamp: new Date().toISOString(),
        };

        console.log(`📩 Yeni mesaj: ${data.sender}: ${data.message}`);

        // Tüm bağlı istemcilere mesajı gönder
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "chat", ...chatMessage }));
          }
        });
      }
    } catch (error) {
      console.error("Geçersiz mesaj formatı:", error);
      ws.send(
        JSON.stringify({ status: "error", message: "Geçersiz mesaj formatı." })
      );
    }
  });

  ws.on("close", () => {
    console.log("İstemci bağlantıyı kapattı.");
    clients.delete(ws);
  });
});

console.log("WebSocket sunucusu 5002 portunda çalışıyor...");
