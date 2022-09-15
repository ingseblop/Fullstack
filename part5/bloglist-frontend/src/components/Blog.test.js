import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'aqui va algo',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('Probe view button', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'aqui va algo',
      url: 'www.alg.com',
      likes: 1,
    } 
    const { container } = render(<Blog blog={blog} />)
    
    const user = userEvent.setup()
    const button = container.querySelector('#view')
    user.click(button)

    const div = container.querySelector('.blog')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Probe likes button', async() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'aqui va algo',
      url: 'www.alg.com',
      likes: 1,
    } 
    const mockHandler = jest.fn()
    render(<Blog blog={blog} likesHandler={mockHandler} />)
    
    const user = userEvent.setup()
    const button = screen.getByTestId('like')
    await user.dblClick(button)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })