import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Test Blog',
    author: 'Wafa',
    url: 'www.fakeurl',
    likes: 3,
    user: { name: 'Admin' }
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )
  })

  test('at start only title and author rendered', () => {
    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('Wafa')
    expect(component.container).not.toHaveTextContent('www.fakeurl')
    const div = component.container.querySelector('.likes')
    expect(div).toBeNull()
  })

  test('after clicking view button, url and likes are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.fakeurl')
    const div = component.container.querySelector('.likes')
    expect(div).toBeDefined()
  })

  test('after clicking like button twice calls event handler twice', () => {
    let button = component.getByText('view')
    fireEvent.click(button)
    button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})