import { render } from 'tests/app-tests-utils'
import { Deposit } from './Deposit'

describe('Deposit', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<Deposit />)

    expect(getByText('This is the Deposit component!')).toBeTruthy()
  })
})
