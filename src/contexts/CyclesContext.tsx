import { differenceInSeconds } from 'date-fns'

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  addNewCycleActionAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/action'

import { CyclesReducers } from '../reducers/cycles/reducer'

interface CycleDataType {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  CreateNewCycle: (data: CycleDataType) => void
  InterruptedCycle: () => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducers, {}, () => {
    const storedStateAsJSON = localStorage.getItem(
      '@ignite-timer:cycle-state-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {
      cycles: [],
      cycleActiveId: null,
    }
  })

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((data) => data.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycle-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction)
  }

  function CreateNewCycle(data: CycleDataType) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleActionAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function InterruptedCycle() {
    dispatch(interruptCurrentCycleAction)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        markCurrentCycleAsFinished,
        CreateNewCycle,
        InterruptedCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
