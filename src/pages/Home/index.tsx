import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import {
  CoutdownContainer,
  FormContainer,
  HomeContainer,
  InputTasks,
  MinutesInput,
  Separator,
  StartCoutdownButton,
  StopCoutdownButton,
} from './style'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: '',
    },
  })

  const activeCycle = cycles.find((data) => data.id === activeCycleId)

  useEffect(() => {
    let interval
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((data) => {
        if (data.id === activeCycleId) {
          return { ...data, interruptedDate: new Date() }
        } else {
          return data
        }
      }),
    )

    setActiveCycleId(null)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const taskValue = watch('task')
  const SubmitDisabled = !taskValue

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="tasks">Vou trabalhar em</label>
          <InputTasks
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="projectName"
            disabled={!!activeCycle}
            {...register('task', { valueAsNumber: false })}
          />

          <datalist id="projectName"></datalist>

          <label htmlFor="minutesAmout">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CoutdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CoutdownContainer>

        {activeCycle ? (
          <StopCoutdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCoutdownButton>
        ) : (
          <StartCoutdownButton type="submit" disabled={SubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCoutdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
