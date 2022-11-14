import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

export const CoutdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;

  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme['gray-600']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
    background: transparent;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const InputTasks = styled(BaseInput)`
  flex: 1;
`

export const MinutesInput = styled(BaseInput)`
  width: 4rem;
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;

  color: ${(props) => props.theme['green-500']};

  overflow: hidden;
`

export const CoutdownButton = styled.button`
  width: 100%;

  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCoutdownButton = styled(CoutdownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopCoutdownButton = styled(CoutdownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
