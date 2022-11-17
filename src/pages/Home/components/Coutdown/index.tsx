import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CoutdownContainer, Separator } from './style'

export function CoutdownIndex() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds: number = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds: number = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount: number = Math.floor(currentSeconds / 60)
  const secondsAmount: number = currentSeconds % 60

  const minutes: string = String(minutesAmount).padStart(2, '0')
  const seconds: string = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let intervalo: any
    if (activeCycle) {
      intervalo = setInterval(() => {
        const differenceInTime = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceInTime >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(intervalo)
        } else {
          setSecondsPassed(differenceInTime)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalo)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CoutdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CoutdownContainer>
  )
}
