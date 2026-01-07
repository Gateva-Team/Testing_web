// NavbarUser.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import navbarData from "./data/navbar.json";
import eventData from "./data/events.json"; // data event nyata
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  CalendarDays,
  Sparkles,
  Bot,
  SendHorizonal,
  CheckCircle2,
} from "lucide-react";

export default function NavbarUser() {
  const navigate = useNavigate();
  const { logo, menu, user } = navbarData;

  // Auto-hide navbar
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY || window.scrollY < 80);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Notifications: event tiket <= 10
  const [notifications, setNotifications] = useState(
    eventData.events
      .filter((e) => e.tickets <= 10)
      .map((e, i) => ({
        id: i,
        title: "Tiket Hampir Habis",
        desc: e.title,
        read: false,
        type: "Tiket",
        event: e,
      }))
  );
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  // AI Assistant
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { from: "ai", text: "Halo 👋 Aku Gateva AI. Mau cari event apa hari ini?" },
  ]);
  const chatEndRef = useRef(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [showAIWindow, setShowAIWindow] = useState(false);

  const sendAIMessage = (input = null) => {
    const message = input ?? aiInput;
    if (!message.trim()) return;
    setAiMessages((prev) => [...prev, { from: "user", text: message }]);
    setAiInput("");
    setAiTyping(true);

    setTimeout(() => {
      const matchingEvents = eventData.events.filter(
        (e) =>
          e.title.toLowerCase().includes(message.toLowerCase()) ||
          e.category.toLowerCase().includes(message.toLowerCase())
      );

      const response = {
        from: "ai",
        text: matchingEvents.length
          ? `✨ Aku menemukan ${matchingEvents.length} event untuk "${message}"!`
          : `😔 Maaf, tidak ada event untuk "${message}".`,
        events: matchingEvents.slice(0, 3),
      };
      setAiMessages((prev) => [...prev, response]);
      setAiTyping(false);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  const quickSuggestion = (text) => sendAIMessage(text);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  const handleLogout = () => navigate("/login");

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="h-20 bg-[#0b0b14]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link to={logo.link} className="flex items-center gap-3">
            <img src={logo.src} alt={logo.alt} className="h-11" />
            <span className="hidden lg:block text-xs text-white/70">
              Smart Event Platform
            </span>
          </Link>

          {/* MENU */}
          <ul className="hidden md:flex items-center gap-10 text-sm">
            {menu.map((item, i) =>
              item.dropdown ? (
                <DropdownMenu key={i}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-white/70 hover:text-[#39ff14] transition">
                    {item.label} <ChevronDown size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-[#0b0b14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                    <DropdownMenuLabel className="text-xs text-white/40 px-3">
                      Event Category
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {item.dropdown.map((sub, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        asChild
                        className="rounded-xl focus:bg-white/5"
                      >
                        <Link
                          to={sub.path}
                          className="flex items-center gap-3 px-3 py-3 text-white/70 hover:text-[#39ff14]"
                        >
                          <Sparkles size={16} /> {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-[#39ff14]"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {/* AI ASSISTANT */}
            <div className="relative">
              <Button
                size="icon"
                className="rounded-full bg-white/5 border border-white/10 hover:bg-[#39ff14]/10"
                onClick={() => setShowAIWindow((prev) => !prev)}
              >
                <Bot className="text-[#39ff14]" />
              </Button>

              {showAIWindow && (
                <div className="absolute top-12 right-0 w-80 bg-[#0b0b14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-lg z-50 flex flex-col max-h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {aiMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl text-sm max-w-[85%] ${
                          msg.from === "ai"
                            ? "bg-white/5 text-white/80"
                            : "bg-[#39ff14]/20 text-white ml-auto"
                        }`}
                      >
                        {msg.text.split("\n").map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                        {msg.events?.map((e, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 mt-2 bg-white/10 p-2 rounded-lg"
                          >
                            <img
                              src={e.image}
                              alt={e.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="text-white/80 text-xs">
                              <p className="font-semibold">{e.title}</p>
                              <p>{e.date}</p>
                              <p>{e.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {aiTyping && (
                      <span className="animate-pulse text-white/70">
                        AI sedang mengetik...
                      </span>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <Separator className="bg-white/10 my-2" />

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Tanya Gateva AI..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && sendAIMessage()}
                      />
                      <Button
                        size="icon"
                        onClick={sendAIMessage}
                        className="bg-[#39ff14]/20 hover:bg-[#39ff14]/30"
                      >
                        <SendHorizonal size={16} className="text-[#39ff14]" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => quickSuggestion("Musik")}
                      >
                        Musik
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => quickSuggestion("Seminar")}
                      >
                        Seminar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => quickSuggestion("Workshop")}
                      >
                        Workshop
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* NOTIFICATIONS */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                  <Bell size={20} className="text-white/80" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#39ff14] text-white text-[10px] animate-pulse">
                      {unreadCount}
                    </Badge>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-[#0b0b14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2"
              >
                <div className="flex justify-between px-3 py-2">
                  <span className="text-sm text-white">Notifikasi</span>
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#39ff14]"
                  >
                    Tandai semua
                  </button>
                </div>
                <Separator className="bg-white/10 my-2" />
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={`rounded-xl p-3 flex justify-between items-center focus:bg-white/5 transition-all duration-200 ${
                      !n.read ? "bg-[#39ff14]/10 shadow-neon" : "bg-white/5"
                    }`}
                  >
                    <div className="flex gap-3">
                      <CalendarDays
                        size={18}
                        className={n.read ? "text-white/30" : "text-[#39ff14]"}
                      />
                      <div>
                        <p className="text-sm text-white">{n.title}</p>
                        <p className="text-xs text-white/40">{n.desc}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {n.type}
                        </Badge>
                      </div>
                    </div>
                    {!n.read && (
                      <CheckCircle2
                        size={16}
                        className="text-[#39ff14] cursor-pointer"
                        onClick={() => markRead(n.id)}
                      />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* USER */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#39ff14]/20 text-[#39ff14]">
                      {user.initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm text-white/70">
                    {user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#0b0b14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2"
              >
                <DropdownMenuItem className="rounded-xl text-white/70 focus:bg-white/5">
                  <User size={16} className="mr-2" /> Profil
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10 my-2" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl text-red-400 focus:bg-white/5"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
