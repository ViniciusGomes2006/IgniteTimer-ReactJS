import { FormContainer, InputTasks, MinutesInput } from './style'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function FormIndex() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
  )
}
