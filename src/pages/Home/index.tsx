import { Play } from 'phosphor-react'
import {
  CoutdownContainer,
  FormContainer,
  HomeContainer,
  InputTasks,
  MinutesInput,
  Separator,
  StartCoutdownButton,
} from './style'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="tasks">Vou trabalhar em</label>
          <InputTasks
            type="text"
            id="tasks"
            placeholder="Dê um nome para o seu projeto"
            list="projectName"
          />

          <datalist id="projectName"></datalist>

          <label htmlFor="minutesAmout">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            step={5}
          />

          <span>minutos.</span>
        </FormContainer>

        <CoutdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CoutdownContainer>

        <StartCoutdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCoutdownButton>
      </form>
    </HomeContainer>
  )
}
