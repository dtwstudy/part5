import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Togglable />', () => {

  let container
  const mockHandler = jest.fn()
  beforeEach(() => {
    container = render(
      <BlogForm onSubmit={mockHandler} />
    ).container
  })

  test('if button clicked  show url and like', async () => {
    const user = userEvent.setup()
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'New blog')
    await user.type(inputs[1], 'Sample')
    await user.type(inputs[2], 'http://localhost:5173/')
    const button = screen.getByText('save')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('New blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('Sample')
    expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost:5173/')
  })

})