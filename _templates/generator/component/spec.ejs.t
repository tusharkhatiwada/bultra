---
to: src/<%= path %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.spec.tsx
---
import { render } from 'tests/app-tests-utils'
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>'

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<<%= h.changeCase.pascal(name) %> />)

    expect(getByText('This is the <%= h.changeCase.pascal(name) %> component!')).toBeTruthy()
  })
})
