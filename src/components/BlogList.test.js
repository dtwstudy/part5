import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {
  const onEvent = () => { console.log()}
  let container
  const mockHandler = jest.fn()
  const data = { title: 'First blog', author: 'Sample' ,url: 'http://localhost:5173/' , like: 5 }
 
  beforeEach(() => {
   container = render(
      <Blog blog={data} hadleOnLike={mockHandler} hadleOnDelete={onEvent}  />
    ).container
  })

  test('if show title and authour', async () => {
    const div = container.querySelector('#title')
    expect(div).toHaveTextContent('First blog Sample')
  })

  test('if button clicked  show url and like', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const p = container.querySelector('#url')
    expect(p).toHaveTextContent('http://localhost:5173/')
  })

  test('if like buttom pressed 2 time', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const likeButton  = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})