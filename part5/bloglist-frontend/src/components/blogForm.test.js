import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm test', async () => {
  const createBlog = jest.fn()
  const handler = jest.fn()
  const handler2 = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm create={createBlog} title={''} author={''} url={''} onChange={handler} onSubmit={handler2}/>)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('add')

  await user.type(inputs[0], 'testing a form...')
  await user.type(inputs[1], 'testing a form...')
  await user.type(inputs[2], 'testing a form...')
  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  
})