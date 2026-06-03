import { useState, useEffect } from "react"
import { XIcon } from "./icons/x-icon"
import { InstagramIcon } from "./icons/instagram-icon"
import { LinkedInIcon } from "./icons/linkedin-icon"
import { SocialIcon } from "./SocialIcon"

const XP_PER_SIGNUP = 50
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

export function WaitlistSignup() {
  const [xp, setXp] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [streak, setStreak] = useState(false)
  const [bounceXp, setBounceXp] = useState(false)

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
      .bounce-xp { animation: bounce-in 0.5s ease; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleSuccess = () => {
    setXp(prev => prev + XP_PER_SIGNUP)
    setStreak(true)
    setShowConfetti(true)
    setBounceXp(true)
    setTimeout(() => setShowConfetti(false), 2000)
    setTimeout(() => setBounceXp(false), 600)
  }

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="w-full max-w-xl mx-auto p-6 flex flex-col justify-between min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center text-center gap-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-bold px-4 py-1.5 rounded-full">
            ⚡ Скоро запуск
          </div>

          {/* Title */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-500">
              Охрана труда<br />в электроэнергетике
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-md">
              Интерактивное обучение для энергетиков — курсы, тесты и нормативная база. Учись как в игре, работай безопасно.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-3 justify-center flex-wrap">
            <StatBadge icon="🏆" label="уровней" value="12" />
            <StatBadge icon="📋" label="модулей" value="36" />
          </div>

          {/* Streak */}
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Серия дней</p>
            <StreakRow active={streak} />
          </div>

          {/* XP Bar */}
          <div className={`w-full ${bounceXp ? "bounce-xp" : ""}`}>
            <XpBar xp={xp} total={TOTAL_XP_FOR_LEVEL} />
          </div>

          {/* CTA Button */}
          <div className="w-full space-y-3">
            <button
              onClick={handleSuccess}
              className="w-full font-extrabold text-white text-lg py-4 rounded-2xl transition-all duration-150 active:scale-95 hover:brightness-110"
              style={{
                background: "linear-gradient(180deg, #58CC02, #46A302)",
                boxShadow: "0 4px 0 #389200",
              }}
            >
              Начать тест ⚡
            </button>
            <p className="text-xs text-gray-500 text-center">Получите <span className="text-yellow-400 font-bold">+50 XP</span> за прохождение первого теста</p>
          </div>


        </div>

        {/* Social */}
        <div className="pt-8 flex justify-center space-x-6">
          <SocialIcon
            href="https://x.com/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            icon={<XIcon className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://instagram.com/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            icon={<InstagramIcon className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://linkedin.com/company/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            icon={<LinkedInIcon className="w-5 h-5" />}
          />
        </div>
      </div>
    </>
  )
}