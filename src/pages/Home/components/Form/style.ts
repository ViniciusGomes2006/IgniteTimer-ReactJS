import styled from 'styled-components'

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

export const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  transition: 150ms;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
    background: transparent;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:disabled:hover {
    animation: myAnim 0.5s linear 150ms 0.5 normal none;
    border-color: ${(props) => props.theme['red-700']};

    &::placeholder {
      color: ${(props) => props.theme['red-500']};
    }
  }

  @keyframes myAnim {
    0%,
    100% {
      transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70% {
      transform: translateX(-10px);
    }

    20%,
    40%,
    60% {
      transform: translateX(10px);
    }

    80% {
      transform: translateX(8px);
    }

    90% {
      transform: translateX(-8px);
    }
  }
`

export const InputTasks = styled(BaseInput)`
  flex: 1;
`

export const MinutesInput = styled(BaseInput)`
  width: 4rem;
`
