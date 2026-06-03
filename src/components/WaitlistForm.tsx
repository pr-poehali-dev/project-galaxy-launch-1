import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"

interface WaitlistFormProps {
  onSuccess: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [btnBounce, setBtnBounce] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsPending(true)
    setBtnBounce(true)
    setTimeout(() => setBtnBounce(false), 500)

    await new Promise(resolve => setTimeout(resolve, 900))

    toast({
      title: "🎉 +50 XP получено!",
      description: "Уведомим вас первыми, когда приложение будет готово.",
      duration: 5000,
    })

    onSuccess()
    setEmail('')
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3 mb-4">
      <div className="flex overflow-hidden rounded-2xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-200">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Введите ваш email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-0 bg-transparent text-white placeholder:text-gray-500 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`
            relative overflow-hidden font-extrabold px-6 rounded-xl transition-all duration-200 text-sm min-w-[130px]
            ${btnBounce ? "scale-95" : "scale-100"}
            ${isPending ? "opacity-70 cursor-not-allowed" : "hover:brightness-110 active:scale-95"}
          `}
          style={{
            background: isPending
              ? "linear-gradient(180deg, #58CC02, #46A302)"
              : "linear-gradient(180deg, #58CC02, #46A302)",
            boxShadow: isPending ? "none" : "0 4px 0 #389200",
            color: "#fff",
            transform: btnBounce ? "scale(0.93)" : undefined,
          }}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Записываю...
            </span>
          ) : (
            <span>Записаться ⚡</span>
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">Получите <span className="text-yellow-400 font-bold">+50 XP</span> за регистрацию и ранний доступ к приложению</p>
    </form>
  )
}
