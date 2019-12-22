import { Box } from 'reflexbox'
import styled from 'styled-components'

const Container = styled(Box)`
  width: 100rem;
  max-width: calc(100vw - 2rem);
`
Container.defaultProps = {
  mx: 'auto',
}

export default Container
