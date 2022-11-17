import styled from 'styled-components'

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

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;

  color: ${(props) => props.theme['green-500']};

  overflow: hidden;
`
