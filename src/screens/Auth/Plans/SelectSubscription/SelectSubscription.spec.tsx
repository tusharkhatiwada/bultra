import { render } from 'tests/app-tests-utils'
import { SelectSubscription } from './SelectSubscription'

describe('SelectSubscription', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<SelectSubscription />)

    expect(getByText('This is the SelectSubscription component!')).toBeTruthy()
  })
})
