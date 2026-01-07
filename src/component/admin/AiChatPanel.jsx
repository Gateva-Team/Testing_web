import React, { useEffect, useRef, useState } from "react";
import { BarChart3, Send, X, Sparkles, Trash2, Activity } from "lucide-react";
import dashboardData from "./data/dashboardAdmin.json";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AIChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo Admin 👋 Saya siap memberikan insight cerdas untuk Gateva.",
      confidence: "High",
      score: 92,
      time: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ================= AI ENGINE ================= */
  const getStat = (title) =>
    dashboardData.stats.find((s) => s.title === title)?.value;

  const generateAIResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes("ringkasan")) {
      return {
        text: `📊 Ringkasan Sistem:
• Total Event: ${getStat("Total Event")}
• Total Transaksi: ${getStat("Total Transaksi")}
• Sistem stabil & normal`,
        confidence: "High",
        score: 95,
      };
    }

    if (q.includes("trend")) {
      return {
        text: `📈 Analisis Trend:
• Event dengan transaksi tinggi meningkat
• Jam sibuk: 19.00 – 21.00
• Minat user stabil`,
        confidence: "Medium",
        score: 88,
      };
    }

    if (q.includes("peringatan")) {
      return {
        text: `⚠️ Peringatan Sistem:
• Tidak ditemukan anomali
• Semua layanan berjalan normal`,
        confidence: "High",
        score: 91,
      };
    }

    if (q.includes("status")) {
      return {
        text: `🟢 Status Sistem:
• API: Online
• Database: Normal
• Payment Gateway: Aktif`,
        confidence: "High",
        score: 97,
      };
    }

    return {
      text: "🤖 Saya dapat membantu analisis event, transaksi, dan performa Gateva.",
      confidence: "Medium",
      score: 80,
    };
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = (content = input) => {
    if (!content.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: content,
        time: new Date(),
      },
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      const ai = generateAIResponse(content);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: ai.text,
          confidence: ai.confidence,
          score: ai.score,
          time: new Date(),
        },
      ]);
      setTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Chat dibersihkan. Saya siap membantu kembali.",
        confidence: "High",
        score: 90,
        time: new Date(),
      },
    ]);
  };

  if (!open) return null;

  return (
    <div
      className="fixed right-0 top-0 h-screen w-[390px]
      bg-gradient-to-b from-[#0b0f14] to-[#07090d]
      border-l border-emerald-500/10
      flex flex-col z-50"
    >
      {/* ================= HEADER ================= */}
      <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-400">
          <BarChart3 size={18} />
          <span className="font-semibold tracking-wide">AI ANALYTICS</span>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-500/15 text-emerald-400 text-[10px]">
            ONLINE
          </Badge>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ================= META ================= */}
      <div className="px-4 py-2 flex justify-between text-xs text-white/40">
        <span>{messages.length} pesan</span>
        <button
          onClick={clearChat}
          className="flex items-center gap-1 hover:text-white"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <Separator className="bg-white/5" />

      {/* ================= CHAT ================= */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm
                ${
                  msg.role === "user"
                    ? "ml-auto bg-emerald-500/15 text-white"
                    : "bg-white/5 text-white/80"
                }`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-white/50">
                <span>{msg.role === "user" ? "YOU" : "AI"}</span>
                <span>•</span>
                <span>{msg.time.toLocaleTimeString()}</span>
              </div>

              {msg.text}

              {msg.role === "ai" && (
                <div className="mt-2 flex gap-2 text-[10px]">
                  <Badge className="bg-white/10 text-white/60">
                    Confidence: {msg.confidence}
                  </Badge>
                  <Badge className="bg-emerald-500/15 text-emerald-400">
                    Score: {msg.score}
                  </Badge>
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="bg-white/5 px-4 py-3 rounded-xl text-sm text-white/50 w-fit">
              AI sedang menganalisis...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ================= INPUT ================= */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="text-xs text-white/40 flex items-center gap-1">
          <Activity size={12} />
          Contoh perintah: ringkasan, trend, status sistem
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu ke AI..."
            className="bg-white/5 border-white/10 text-white placeholder-white/40"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={() => sendMessage()}
            className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
