import styled, {DefaultTheme, StyledComponent} from 'styled-components'

export const MenuDivider: StyledComponent<'hr', DefaultTheme> = styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`
