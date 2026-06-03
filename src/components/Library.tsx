import { useState } from "react"

const TOPICS = [
  {
    id: 1,
    icon: "⚡",
    category: "Основы",
    title: "Группы по электробезопасности",
    duration: "5 мин",
    xp: 20,
    content: `Группа по электробезопасности — это уровень квалификации работника, позволяющий выполнять работы в электроустановках.

**I группа** — неэлектротехнический персонал. Присваивается путём инструктажа без проверки знаний. Подходит для уборщиц, охранников и других, работающих вблизи электроустановок.

**II группа** — начальный уровень. Знание основ электробезопасности, умение оказать первую помощь. Присваивается с 18 лет.

**III группа** — право единоличной работы в установках до 1000 В и в качестве члена бригады в установках выше 1000 В. Требуется стаж с II группой не менее 1 месяца.

**IV группа** — право оперативного обслуживания и организации работ в установках до и выше 1000 В. Знание ПТЭ и ПУЭ. Стаж с III группой не менее 3 месяцев.

**V группа** — право на все виды работ, включая руководство бригадами в установках выше 1000 В. Стаж с IV группой не менее 3 месяцев.`,
  },
  {
    id: 2,
    icon: "🦺",
    category: "Средства защиты",
    title: "Средства индивидуальной защиты",
    duration: "7 мин",
    xp: 20,
    content: `Средства индивидуальной защиты (СИЗ) в электроэнергетике делятся на основные и дополнительные.

**Основные электрозащитные средства** — выдерживают рабочее напряжение и позволяют работать на токоведущих частях:
- До 1000 В: диэлектрические перчатки, изолирующие штанги, указатели напряжения, инструмент с изолированными рукоятками.
- Выше 1000 В: изолирующие штанги, клещи, указатели напряжения, гибкие изолирующие перекрытия.

**Дополнительные средства** — снижают риск, но не защищают полностью:
- До 1000 В: диэлектрические галоши, боты, коврики, подставки.
- Выше 1000 В: диэлектрические перчатки, боты, коврики.

**Важно:** все СИЗ должны проходить периодические электрические испытания. Использование просроченных СИЗ запрещено.`,
  },
  {
    id: 3,
    icon: "🔒",
    category: "Организация работ",
    title: "Наряд-допуск и распоряжение",
    duration: "8 мин",
    xp: 20,
    content: `Работы в электроустановках выполняются по наряду-допуску, распоряжению или в порядке текущей эксплуатации.

**Наряд-допуск** — письменное задание на производство работы, выдаётся для сложных и опасных работ. Содержит:
- Место и содержание работы
- Время начала и окончания
- Состав бригады
- Технические меры безопасности
- Подписи выдающего и принимающего

**Распоряжение** — устное или письменное задание на работы небольшого объёма (до 1 рабочего дня). Фиксируется в оперативном журнале.

**Текущая эксплуатация** — небольшие работы, выполняемые самостоятельно оперативным персоналом в зоне своего обслуживания.

Наряд выдаётся на срок не более 15 календарных дней. Продление возможно, но не более одного раза.`,
  },
  {
    id: 4,
    icon: "🚨",
    category: "Первая помощь",
    title: "Действия при поражении током",
    duration: "6 мин",
    xp: 20,
    content: `Поражение электрическим током требует немедленных и правильных действий.

**Шаг 1 — Освободить от тока**
Отключите источник питания или оттолкните пострадавшего сухим диэлектрическим предметом (деревянная палка, пластик). Не касайтесь голыми руками!

**Шаг 2 — Оценить состояние**
Проверьте сознание, дыхание и пульс. Если пострадавший без сознания — вызовите скорую немедленно (112).

**Шаг 3 — СЛР при необходимости**
При отсутствии дыхания — начните сердечно-лёгочную реанимацию: 30 надавливаний на грудину + 2 вдоха. Продолжайте до прибытия скорой.

**Шаг 4 — Ожоги**
При электрических ожогах накройте место стерильной повязкой. Не используйте вату, масло или мази.

**Важно:** даже если пострадавший чувствует себя хорошо — госпитализация обязательна, так как последствия могут проявиться позже.`,
  },
  {
    id: 5,
    icon: "⚠️",
    category: "Знаки безопасности",
    title: "Плакаты и знаки в электроустановках",
    duration: "5 мин",
    xp: 20,
    content: `Знаки и плакаты безопасности делятся на четыре группы по цвету и назначению.

**Запрещающие (красный фон):**
- «Не включать! Работают люди» — вешается на привод коммутационного аппарата
- «Не включать! Работа на линии» — для линий электропередачи
- «Не открывать! Работают люди»

**Предупреждающие (жёлтый фон, чёрный знак):**
- «Осторожно! Электрическое напряжение» — треугольник с молнией
- «Стой! Напряжение» — у опасных зон

**Предписывающие (зелёный фон):**
- «Работать здесь» — указывает место работы
- «Влезать здесь» — разрешённый путь подъёма

**Указательные (синий фон):**
- «Заземлено» — на заземлённое оборудование

Плакаты устанавливаются перед началом работы и снимаются только после её окончания.`,
  },
  {
    id: 6,
    icon: "🌩️",
    category: "Основы",
    title: "Опасное воздействие тока на человека",
    duration: "4 мин",
    xp: 20,
    content: `Электрический ток воздействует на организм тепловым, химическим и биологическим путём.

**Пороговые значения тока (переменный 50 Гц):**
- 0,6–1,5 мА — ощутимый ток (лёгкое покалывание)
- 3–7 мА — судорожный, неотпускающий ток
- 25–50 мА — фибрилляция желудочков сердца
- Свыше 100 мА — смертельный ток

**Факторы, влияющие на исход:**
- **Сила тока** — главный фактор опасности
- **Путь прохождения** — наиболее опасен путь «рука-рука» или «рука-нога» через сердце
- **Время воздействия** — чем дольше, тем опаснее
- **Частота** — переменный ток 50–60 Гц наиболее опасен
- **Состояние человека** — влажная кожа снижает сопротивление в 10–25 раз

Сопротивление тела человека в норме составляет 1000–100 000 Ом, при влажной коже снижается до 300–500 Ом.`,
  },
]

interface ArticleProps {
  topic: typeof TOPICS[0]
  isRead: boolean
  onBack: () => void
  onRead: (id: number, xp: number) => void
}

function Article({ topic, isRead, onBack, onRead }: ArticleProps) {
  const [showBadge, setShowBadge] = useState(false)
  const lines = topic.content.split("\n").filter(Boolean)

  const handleMarkRead = () => {
    if (isRead) return
    onRead(topic.id, topic.xp)
    setShowBadge(true)
    setTimeout(() => setShowBadge(false), 2000)
  }

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-300 text-sm transition-colors"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
          {topic.icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{topic.category}</p>
          <h3 className="text-xl font-extrabold text-white leading-tight">{topic.title}</h3>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-600">
        <span>🕐 {topic.duration} чтения</span>
        <span className="text-yellow-500 font-bold">+{topic.xp} XP за прочтение</span>
        {isRead && <span className="text-green-400 font-bold">✅ Прочитано</span>}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
        {lines.map((line, i) => {
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={i} className="text-white font-bold text-sm mt-2">
                {line.replace(/\*\*/g, "")}
              </p>
            )
          }
          if (line.startsWith("- ")) {
            const parts = line.slice(2).split("**")
            return (
              <div key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-green-500 mt-0.5 shrink-0">•</span>
                <span>
                  {parts.map((p, j) =>
                    j % 2 === 1
                      ? <strong key={j} className="text-white">{p}</strong>
                      : p
                  )}
                </span>
              </div>
            )
          }
          const parts = line.split(/(\*\*[^*]+\*\*)/)
          return (
            <p key={i} className="text-gray-300 text-sm leading-relaxed">
              {parts.map((p, j) =>
                p.startsWith("**") && p.endsWith("**")
                  ? <strong key={j} className="text-white">{p.replace(/\*\*/g, "")}</strong>
                  : p
              )}
            </p>
          )
        })}
      </div>

      {/* Mark as read button */}
      <div className="relative">
        {showBadge && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-extrabold px-4 py-1.5 rounded-full animate-fade-in shadow-lg">
            +{topic.xp} XP получено! ⚡
          </div>
        )}
        <button
          onClick={handleMarkRead}
          disabled={isRead}
          className="w-full font-extrabold py-4 rounded-2xl text-white transition-all duration-200 active:scale-95 disabled:cursor-default"
          style={isRead ? {
            background: "linear-gradient(180deg, #2d4a2d, #1e331e)",
            boxShadow: "none",
            opacity: 0.7,
          } : {
            background: "linear-gradient(180deg, #58CC02, #46A302)",
            boxShadow: "0 4px 0 #389200",
          }}
        >
          {isRead ? "✅ Уже прочитано" : "Отметить как прочитанное"}
        </button>
      </div>
    </div>
  )
}

interface LibraryProps {
  onXpEarned: (xp: number) => void
}

export function Library({ onXpEarned }: LibraryProps) {
  const [selected, setSelected] = useState<typeof TOPICS[0] | null>(null)
  const [filter, setFilter] = useState("Все")
  const [readIds, setReadIds] = useState<Set<number>>(new Set())

  const categories = ["Все", ...Array.from(new Set(TOPICS.map(t => t.category)))]
  const filtered = filter === "Все" ? TOPICS : TOPICS.filter(t => t.category === filter)
  const readCount = readIds.size
  const totalCount = TOPICS.length

  const handleRead = (id: number, xp: number) => {
    setReadIds(prev => new Set([...prev, id]))
    onXpEarned(xp)
  }

  if (selected) {
    return (
      <Article
        topic={selected}
        isRead={readIds.has(selected.id)}
        onBack={() => setSelected(null)}
        onRead={handleRead}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="text-center">
        <h3 className="text-2xl font-extrabold text-white">Библиотека</h3>
        <p className="text-gray-500 text-sm mt-1">Теоретическая база по охране труда</p>
      </div>

      {/* Progress */}
      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Прочитано статей</span>
          <span className="text-white font-bold">{readCount} / {totalCount}</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(readCount / totalCount) * 100}%`,
              background: "linear-gradient(90deg, #58CC02, #89E219)",
              boxShadow: "0 0 8px #58CC0250",
            }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              filter === cat
                ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                : "bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {filtered.map(topic => {
          const isRead = readIds.has(topic.id)
          return (
            <button
              key={topic.id}
              onClick={() => setSelected(topic)}
              className={`w-full text-left rounded-2xl px-4 py-4 flex items-center gap-4 transition-all duration-200 active:scale-98 border ${
                isRead
                  ? "bg-green-500/8 border-green-500/20 hover:bg-green-500/12"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${isRead ? "bg-green-500/20" : "bg-white/10"}`}>
                {isRead ? "✅" : topic.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">{topic.category}</p>
                <p className={`font-bold text-sm leading-snug ${isRead ? "text-gray-400" : "text-white"}`}>{topic.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-gray-600 text-xs">🕐 {topic.duration}</span>
                  <span className="text-yellow-600 text-xs font-bold">+{topic.xp} XP</span>
                </div>
              </div>
              <span className="text-gray-600 text-lg shrink-0">{isRead ? "" : "›"}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
