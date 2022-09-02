---
to: src/<%= path %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.spec.tsx
---
import { render } from 'tests/app-tests-utils'
import { <%= h.changeCase.pascal(name) %>, <%= h.changeCase.pascal(name) %>Props } from './<%= h.changeCase.pascal(name) %>'

const props = {} as <%= h.changeCase.pascal(name) %>Props

describe('<%= h.changeCase.pascal(name) %>', () => {
  it('displays the default message', async () => {
    const { getByText } = await render(<<%= h.changeCase.pascal(name) %> {...props} />)

    expect(getByText('This is the <%= h.changeCase.pascal(name) %> component!')).toBeTruthy()
  })
})
