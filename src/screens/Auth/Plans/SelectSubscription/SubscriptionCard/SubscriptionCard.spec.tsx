import { render } from 'tests/app-tests-utils'
import { SubscriptionCard } from './SubscriptionCard'

describe('SubscriptionCard', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<SubscriptionCard />)

    expect(getByText('This is the SubscriptionCard component!')).toBeTruthy()
  })
})
