const MOCK_PLAYERS = [
  { name: "Александр К.", xp: 980, avatar: "АК", streak: 12 },
  { name: "Марина П.", xp: 860, avatar: "МП", streak: 9 },
  { name: "Дмитрий Р.", xp: 740, avatar: "ДР", streak: 7 },
  { name: "Елена С.", xp: 620, avatar: "ЕС", streak: 5 },
  { name: "Игорь В.", xp: 510, avatar: "ИВ", streak: 4 },
  { name: "Светлана Н.", xp: 430, avatar: "СН", streak: 3 },
  { name: "Андрей М.", xp: 310, avatar: "АМ", streak: 2 },
  { name: "Ольга Т.", xp: 220, avatar: "ОТ", streak: 1 },
]

const AVATAR_COLORS = [
  "bg-purple-600",
  "bg-blue-500",
  "bg-cyan-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-sky-600",
  "bg-blue-700",
]

const MEDALS = ["🥇", "🥈", "🥉"]

interface LeaderboardProps {
  myXp: number
}

export function Leaderboard({ myXp }: LeaderboardProps) {
  const myEntry = { name: "Вы", xp: myXp, avatar: "ВЫ", streak: 1, isMe: true }

  const allPlayers = [...MOCK_PLAYERS.map(p => ({ ...p, isMe: false })), myEntry]
    .sort((a, b) => b.xp - a.xp)

  const myRank = allPlayers.findIndex(p => p.isMe) + 1
  const topXp = allPlayers[0]?.xp || 1

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-extrabold text-white">Рейтинг недели</h3>
        <p className="text-gray-500 text-sm mt-1">Набирайте XP и поднимайтесь выше</p>
      </div>

      {/* My rank highlight */}
      {myXp > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl px-4 py-3 flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-sm">🏅 Ваше место</span>
          <span className="text-white font-extrabold text-lg">#{myRank}</span>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2">
        {allPlayers.map((player, i) => {
          const percent = Math.round((player.xp / topXp) * 100)
          const isTop3 = i < 3
          const isMe = player.isMe

          return (
            <div
              key={player.name}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-200 ${
                isMe
                  ? "bg-blue-500/15 border-blue-500/40"
                  : isTop3
                  ? "bg-white/7 border-white/15"
                  : "bg-white/4 border-white/8"
              }`}
            >
              {/* Rank */}
              <div className="w-7 text-center shrink-0">
                {i < 3 ? (
                  <span className="text-xl">{MEDALS[i]}</span>
                ) : (
                  <span className="text-gray-500 font-bold text-sm">#{i + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${isMe ? "bg-blue-600" : AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                {player.avatar}
              </div>

              {/* Name + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold text-sm truncate ${isMe ? "text-blue-300" : "text-white"}`}>
                    {player.name} {isMe && <span className="text-blue-400 text-xs font-normal">(вы)</span>}
                  </span>
                  <span className="text-yellow-400 font-extrabold text-xs ml-2 shrink-0">⚡ {player.xp}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percent}%`,
                      background: isMe
                        ? "linear-gradient(90deg, #1CB0F6, #0e90cc)"
                        : isTop3
                        ? "linear-gradient(90deg, #58CC02, #89E219)"
                        : "linear-gradient(90deg, #4B5563, #6B7280)",
                    }}
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="shrink-0 text-right">
                <span className="text-xs text-gray-500">🔥 {player.streak}</span>
              </div>
            </div>
          )
        })}
      </div>

      {myXp === 0 && (
        <p className="text-center text-gray-600 text-xs">Пройдите тест, чтобы попасть в рейтинг</p>
      )}
    </div>
  )
}
