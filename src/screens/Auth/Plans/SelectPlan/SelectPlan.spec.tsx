import { render } from 'tests/app-tests-utils'
import { SelectPlan } from './SelectPlan'

describe('SelectPlan', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<SelectPlan />)

    expect(getByText('This is the SelectPlan component!')).toBeTruthy()
  })
})
