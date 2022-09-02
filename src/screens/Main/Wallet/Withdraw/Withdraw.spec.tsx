import { render } from 'tests/app-tests-utils'
import { Withdraw } from './Withdraw'

describe('Withdraw', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<Withdraw />)

    expect(getByText('This is the Withdraw component!')).toBeTruthy()
  })
})
