import { useState } from "react"

const questions = [
  {
    question: "Какая минимальная группа по электробезопасности требуется для работы в электроустановках напряжением до 1000 В единолично?",
    options: ["I группа", "II группа", "III группа", "IV группа"],
    correct: 2,
    explanation: "Для единоличной работы в электроустановках до 1000 В необходима III группа по электробезопасности.",
    docs: [
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "п. 3.3" },
      { title: "Приказ Минэнерго №6 (ПТЭЭП)", clause: "Приложение №1" },
    ],
  },
  {
    question: "Что необходимо сделать в первую очередь при поражении человека электрическим током?",
    options: [
      "Начать искусственное дыхание",
      "Вызвать скорую помощь",
      "Освободить пострадавшего от действия тока",
      "Уложить пострадавшего на землю",
    ],
    correct: 2,
    explanation: "Первое действие — освободить пострадавшего от действия тока, отключив источник или оттолкнув его диэлектрическим предметом.",
    docs: [
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "п. 89" },
      { title: "ГОСТ Р 55386-2022 (Первая помощь. Термины и определения)", clause: "разд. 4" },
    ],
  },
  {
    question: "Какой цвет имеет шина защитного заземления (PE) согласно ПУЭ?",
    options: ["Синий", "Красный", "Жёлто-зелёный", "Чёрный"],
    correct: 2,
    explanation: "Шина защитного заземления (PE) маркируется жёлто-зелёным цветом согласно ПУЭ.",
    docs: [
      { title: "ПУЭ (Правила устройства электроустановок), 7-е издание", clause: "п. 1.1.29" },
      { title: "ГОСТ IEC 60446-2015 (Маркировка проводников)", clause: "п. 5.3" },
    ],
  },
  {
    question: "С какой периодичностью проводится повторный инструктаж по охране труда для работников электроэнергетики?",
    options: ["Раз в 3 месяца", "Раз в 6 месяцев", "Раз в год", "Раз в 2 года"],
    correct: 1,
    explanation: "Повторный инструктаж проводится не реже одного раза в 6 месяцев.",
    docs: [
      { title: "Постановление Правительства РФ №2464 (Порядок обучения по охране труда)", clause: "п. 16" },
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "п. 2.4" },
    ],
  },
  {
    question: "Что означает знак «Не включать! Работают люди»?",
    options: [
      "Оборудование находится на техническом обслуживании",
      "Запрет подачи напряжения на оборудование, где работают люди",
      "Оборудование неисправно",
      "Вход в зону запрещён",
    ],
    correct: 1,
    explanation: "Знак запрещает включение оборудования, на котором ведутся работы, во избежание поражения работников током.",
    docs: [
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "Приложение №8" },
      { title: "ГОСТ Р 12.4.026-2015 (Цвета сигнальные, знаки безопасности)", clause: "п. 6.1" },
    ],
  },
  {
    question: "Какое напряжение считается безопасным для работы с переносным инструментом в особо опасных помещениях?",
    options: ["220 В", "127 В", "42 В", "12 В"],
    correct: 3,
    explanation: "В особо опасных помещениях для переносного инструмента применяется напряжение не выше 12 В.",
    docs: [
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "п. 44.6" },
      { title: "ПУЭ, 7-е издание", clause: "п. 1.7.46" },
    ],
  },
  {
    question: "Что входит в состав бригады при работе в электроустановках напряжением выше 1000 В?",
    options: [
      "Не менее одного работника с группой IV и выше",
      "Производитель работ с группой V и член бригады с группой III",
      "Любые два работника с группой III",
      "Производитель работ с группой III и наблюдающий",
    ],
    correct: 1,
    explanation: "Бригада должна включать производителя работ с группой V и хотя бы одного члена бригады с группой III.",
    docs: [
      { title: "Приказ Минтруда №903н (Правила по охране труда при эксплуатации электроустановок)", clause: "п. 5.15" },
      { title: "Приказ Минэнерго №6 (ПТЭЭП)", clause: "п. 1.4.6" },
    ],
  },
]

const XP_PER_CORRECT = 30

interface QuizProps {
  onFinish: (xpEarned: number) => void
}

export function Quiz({ onFinish }: QuizProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrongShake, setWrongShake] = useState(false)

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  const handleSelect = (i: number) => {
    if (confirmed) return
    setSelected(i)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    const isCorrect = selected === q.correct
    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      setWrongShake(true)
      setTimeout(() => setWrongShake(false), 600)
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
      onFinish(score * XP_PER_CORRECT + (selected === q.correct ? XP_PER_CORRECT : 0))
    } else {
      setCurrent(prev => prev + 1)
      setSelected(null)
      setConfirmed(false)
    }
  }

  const isCorrect = confirmed && selected === q.correct
  const isWrong = confirmed && selected !== q.correct
  const finalScore = finished ? score : score + (selected === q.correct && confirmed ? 1 : 0)

  if (finished) {
    const pct = Math.round((finalScore / questions.length) * 100)
    const emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"
    return (
      <div className="flex flex-col items-center text-center gap-6 py-4 animate-fade-in">
        <div className="text-6xl">{emoji}</div>
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-1">Тест завершён!</h3>
          <p className="text-gray-400">Правильных ответов: <span className="text-white font-bold">{finalScore} из {questions.length}</span></p>
        </div>
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Результат</span>
            <span className="text-yellow-400 font-bold">+{finalScore * XP_PER_CORRECT} XP</span>
          </div>
          <div className="h-4 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${pct}%`,
                background: pct >= 80 ? "linear-gradient(90deg,#58CC02,#89E219)" : pct >= 50 ? "linear-gradient(90deg,#FFD700,#FFA500)" : "linear-gradient(90deg,#FF4B4B,#FF7070)",
                boxShadow: "0 0 10px rgba(88,204,2,0.4)",
              }}
            />
          </div>
          <p className="text-white font-bold text-xl">{pct}%</p>
        </div>
        <p className="text-gray-500 text-sm max-w-xs">
          {pct >= 80 ? "Отличный результат! Вы отлично знаете правила охраны труда." : pct >= 50 ? "Хороший старт! Продолжайте обучение для повышения результата." : "Рекомендуем повторить материал по охране труда в электроэнергетике."}
        </p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-5 ${wrongShake ? "animate-shake" : ""}`}
      style={wrongShake ? { animation: "shake 0.5s ease" } : {}}>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Вопрос {current + 1} из {questions.length}</span>
          <span className="text-yellow-400 font-bold">⚡ {score * XP_PER_CORRECT} XP</span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #58CC02, #89E219)",
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-white font-bold text-base leading-snug">{q.question}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          let style = "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10"
          if (confirmed) {
            if (i === q.correct) style = "border-green-500 bg-green-500/15 text-green-300"
            else if (i === selected) style = "border-red-500 bg-red-500/15 text-red-300"
            else style = "border-white/5 bg-white/3 text-gray-600"
          } else if (selected === i) {
            style = "border-blue-400 bg-blue-500/15 text-white"
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-sm transition-all duration-200 ${style} ${!confirmed ? "active:scale-98 cursor-pointer" : "cursor-default"}`}
            >
              <span className="mr-2 font-bold text-gray-500">{["A", "B", "C", "D"][i]}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className={`rounded-xl p-4 text-sm border flex flex-col gap-3 ${isCorrect ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-red-500/10 border-red-500/30 text-red-300"}`}>
          <div>
            <p className="font-bold mb-1">{isCorrect ? "✅ Верно!" : "❌ Неверно"}</p>
            <p className="text-xs opacity-80">{q.explanation}</p>
          </div>
          <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">📄 Нормативные документы</p>
            {q.docs.map((doc, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="text-gray-600 shrink-0">•</span>
                <span><span className="text-gray-300">{doc.title}</span> — <span className="text-yellow-500 font-semibold">{doc.clause}</span></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action button */}
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full font-extrabold text-white py-4 rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(180deg, #58CC02, #46A302)",
            boxShadow: selected !== null ? "0 4px 0 #389200" : "none",
          }}
        >
          Проверить
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full font-extrabold text-white py-4 rounded-2xl transition-all duration-150 active:scale-95 hover:brightness-110"
          style={{
            background: "linear-gradient(180deg, #1CB0F6, #1490CC)",
            boxShadow: "0 4px 0 #0e6fa0",
          }}
        >
          {current + 1 >= questions.length ? "Завершить тест 🏆" : "Следующий вопрос →"}
        </button>
      )}
    </div>
  )
}