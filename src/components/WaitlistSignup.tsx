import { useState, useEffect } from "react"
import { XIcon } from "./icons/x-icon"
import { InstagramIcon } from "./icons/instagram-icon"
import { LinkedInIcon } from "./icons/linkedin-icon"
import { SocialIcon } from "./SocialIcon"
import { Quiz } from "./Quiz"
import { Leaderboard } from "./Leaderboard"
import { Library } from "./Library"

const TOTAL_XP_FOR_LEVEL = 200

const STREAK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  const pieces = Array.from({ length: 40 })
  const colors = ["#58CC02", "#FFD700", "#FF4B4B", "#1CB0F6", "#FF9600", "#CE82FF"]
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const color = colors[i % colors.length]
        const left = `${Math.random() * 100}%`
        const delay = `${Math.random() * 0.6}s`
        const size = `${6 + Math.random() * 8}px`
        const duration = `${0.8 + Math.random() * 0.8}s`
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-20px",
              left,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              animation: `confetti-fall ${duration} ${delay} ease-in forwards`,
            }}
          />
        )
      })}
    </div>
  )
}

function XpBar({ xp, total }: { xp: number; total: number }) {
  const percent = Math.min((xp / total) * 100, 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span className="font-bold text-yellow-400">⚡ {xp} XP</span>
        <span>{total} XP до старта</span>
      </div>
      <div className="h-4 rounded-full bg-white/10 overflow-hidden border border-white/10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #58CC02, #89E219)",
            boxShadow: "0 0 10px #58CC0260",
          }}
        />
      </div>
    </div>
  )
}

function StreakRow({ active }: { active: boolean }) {
  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1
  return (
    <div className="flex gap-2 justify-center">
      {STREAK_DAYS.map((day, i) => {
        const isPast = i < todayIndex
        const isToday = i === todayIndex && active
        return (
          <div key={day} className="flex flex-col items-center gap-1">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                isToday
                  ? "bg-yellow-400 scale-110 shadow-lg shadow-yellow-400/40"
                  : isPast
                  ? "bg-green-500/20 border border-green-500/40"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {isToday ? "🔥" : isPast ? "✅" : "○"}
            </div>
            <span className={`text-[10px] font-semibold ${isToday ? "text-yellow-400" : "text-gray-500"}`}>
              {day}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function StatBadge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 min-w-[80px]">
      <span className="text-2xl">{icon}</span>
      <span className="text-white font-extrabold text-sm">{value}</span>
      <span className="text-gray-500 text-[10px] uppercase tracking-wide">{label}</span>
    </div>
  )
}

type Screen = "home" | "quiz" | "leaderboard" | "library"

function loadState() {
  try {
    return {
      xp: Number(localStorage.getItem("ot_xp") || 0),
      streak: localStorage.getItem("ot_streak") === "true",
    }
  } catch {
    return { xp: 0, streak: false }
  }
}

export function WaitlistSignup() {
  const [screen, setScreen] = useState<Screen>("home")
  const [xp, setXp] = useState(() => loadState().xp)
  const [showConfetti, setShowConfetti] = useState(false)
  const [streak, setStreak] = useState(() => loadState().streak)
  const [bounceXp, setBounceXp] = useState(false)

  useEffect(() => {
    try { localStorage.setItem("ot_xp", String(xp)) } catch (e) { console.warn(e) }
  }, [xp])

  useEffect(() => {
    try { localStorage.setItem("ot_streak", String(streak)) } catch (e) { console.warn(e) }
  }, [streak])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes confetti-fall {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
      @keyframes bounce-in {
        0%   { transform: scale(1); }
        40%  { transform: scale(1.4); }
        70%  { transform: scale(0.9); }
        100% { transform: scale(1); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%      { transform: translateX(-8px); }
        40%      { transform: translateX(8px); }
        60%      { transform: translateX(-5px); }
        80%      { transform: translateX(5px); }
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes mascot-float {
        0%, 100% { transform: translateY(0px); }
        50%      { transform: translateY(-8px); }
      }
      .bounce-xp { animation: bounce-in 0.5s ease; }
      .animate-fade-in { animation: fade-in 0.4s ease; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleQuizFinish = (xpEarned: number) => {
    setXp(prev => prev + xpEarned)
    setStreak(true)
    setShowConfetti(true)
    setBounceXp(true)
    setTimeout(() => setShowConfetti(false), 2500)
    setTimeout(() => setBounceXp(false), 600)
  }

  const NAV = [
    { key: "home" as Screen, icon: "🏠", label: "Главная" },
    { key: "library" as Screen, icon: "📚", label: "Библиотека" },
    { key: "leaderboard" as Screen, icon: "🏆", label: "Рейтинг" },
  ]

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="w-full max-w-xl mx-auto p-6 flex flex-col justify-between min-h-screen">

        {/* Top nav */}
        {screen !== "quiz" && (
          <div className="flex gap-2 mb-2">
            {NAV.map(n => (
              <button
                key={n.key}
                onClick={() => setScreen(n.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  screen === n.key
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {n.icon} {n.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1 text-yellow-400 font-extrabold text-sm">
              ⚡ {xp} XP
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center gap-6">

          {/* HOME */}
          {screen === "home" && (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-bold px-4 py-1.5 rounded-full">
                ⚡ Скоро запуск
              </div>

              {/* Mascot */}
              <div style={{ animation: "mascot-float 3s ease-in-out infinite" }}>
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Helmet */}
                  <rect x="22" y="8" width="52" height="38" rx="16" fill="#FFD700" />
                  <rect x="28" y="14" width="40" height="26" rx="10" fill="#1a1a1a" />
                  {/* Visor shine */}
                  <rect x="32" y="17" width="12" height="5" rx="2.5" fill="#58CC02" opacity="0.7" />
                  {/* Eyes */}
                  <circle cx="37" cy="27" r="5" fill="#58CC02" />
                  <circle cx="59" cy="27" r="5" fill="#58CC02" />
                  <circle cx="38.5" cy="25.5" r="1.5" fill="white" />
                  <circle cx="60.5" cy="25.5" r="1.5" fill="white" />
                  {/* Antenna */}
                  <rect x="46" y="2" width="4" height="8" rx="2" fill="#FFD700" />
                  <circle cx="48" cy="2" r="3" fill="#58CC02" />
                  {/* Body */}
                  <rect x="26" y="48" width="44" height="30" rx="12" fill="#2a2a2a" stroke="#FFD700" strokeWidth="2" />
                  {/* Chest bolt */}
                  <text x="48" y="68" textAnchor="middle" fontSize="16" fill="#FFD700">⚡</text>
                  {/* Arms */}
                  <rect x="10" y="50" width="14" height="8" rx="4" fill="#2a2a2a" stroke="#FFD700" strokeWidth="1.5" />
                  <rect x="72" y="50" width="14" height="8" rx="4" fill="#2a2a2a" stroke="#FFD700" strokeWidth="1.5" />
                  {/* Legs */}
                  <rect x="32" y="78" width="12" height="14" rx="5" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1.5" />
                  <rect x="52" y="78" width="12" height="14" rx="5" fill="#1a1a1a" stroke="#FFD700" strokeWidth="1.5" />
                </svg>
              </div>

              <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-500">
                  Охрана труда<br />в электроэнергетике
                </h2>
                <p className="text-base sm:text-lg text-gray-400 max-w-md">
                  Интерактивное обучение для энергетиков — курсы, тесты и нормативная база. Учись как в игре, работай безопасно.
                </p>
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <StatBadge icon="🏆" label="уровней" value="12" />
                <StatBadge icon="📋" label="модулей" value="36" />
              </div>

              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Серия дней</p>
                <StreakRow active={streak} />
              </div>

              <div className={`w-full ${bounceXp ? "bounce-xp" : ""}`}>
                <XpBar xp={xp} total={TOTAL_XP_FOR_LEVEL} />
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={() => setScreen("quiz")}
                  className="w-full font-extrabold text-white text-lg py-4 rounded-2xl transition-all duration-150 active:scale-95 hover:brightness-110"
                  style={{
                    background: "linear-gradient(180deg, #58CC02, #46A302)",
                    boxShadow: "0 4px 0 #389200",
                  }}
                >
                  Начать тест ⚡
                </button>
                <p className="text-xs text-gray-500 text-center">Получите <span className="text-yellow-400 font-bold">+XP</span> за прохождение первого теста</p>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && (
            <div className="animate-fade-in">
              <button
                onClick={() => setScreen("home")}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-300 text-sm mb-5 transition-colors"
              >
                ← Назад
              </button>
              <Quiz onFinish={handleQuizFinish} />
            </div>
          )}

          {/* LIBRARY */}
          {screen === "library" && (
            <div className="animate-fade-in">
              <Library onXpEarned={(earned) => {
                setXp(prev => prev + earned)
                setBounceXp(true)
                setTimeout(() => setBounceXp(false), 600)
              }} />
            </div>
          )}

          {/* LEADERBOARD */}
          {screen === "leaderboard" && (
            <div className="animate-fade-in">
              <Leaderboard myXp={xp} />
            </div>
          )}

        </div>

        {/* Social */}
        <div className="pt-8 flex justify-center space-x-6">
          <SocialIcon href="https://x.com/example" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" icon={<XIcon className="w-5 h-5" />} />
          <SocialIcon href="https://instagram.com/example" target="_blank" rel="noopener noreferrer" aria-label="Instagram" icon={<InstagramIcon className="w-5 h-5" />} />
          <SocialIcon href="https://linkedin.com/company/example" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" icon={<LinkedInIcon className="w-5 h-5" />} />
        </div>
      </div>
    </>
  )
}