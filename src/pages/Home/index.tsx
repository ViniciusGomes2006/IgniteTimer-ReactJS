import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartCoutdownButton, StopCoutdownButton } from './style'
import { FormIndex } from './components/Form'
import { CoutdownIndex } from './components/Coutdown'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos!'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, CreateNewCycle, InterruptedCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: undefined,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }

  const taskValue = watch('task')
  const SubmitDisabled = !taskValue

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <FormIndex />
        </FormProvider>
        <CoutdownIndex />
        {activeCycle ? (
          <StopCoutdownButton onClick={InterruptedCycle} type="button">
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
