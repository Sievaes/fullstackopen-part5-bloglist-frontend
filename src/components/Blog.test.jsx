import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { beforeEach } from "vitest"

describe("<Blog />", () => {
  beforeEach(() => {
    const blog = {
      title: "title",
      author: "author",
      url: "url",
      user: {
        username: "testuser",
        name: "Test User",
      },
    }
    render(<Blog blog={blog} />).container
  })

  test("check only blog title and author is displayed, but not URL", () => {
    // Debug the container to see the rendered output

    expect(screen.queryByText("title", { exact: false })).toBeInTheDocument()
    expect(screen.queryByText("author", { exact: false })).toBeInTheDocument()
    expect(screen.queryByText("url", { exact: false })).not.toBeInTheDocument()
  })

  test("Check that blog URL and number of likes are shown when button is pressed", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("Show")
    await user.click(button)

    expect(screen.queryByText("url", { exact: false })).toBeInTheDocument()
    expect(screen.queryByText("likes", { exact: false })).toBeInTheDocument()
  })
})

describe("<Blog />", () => {
  test("check if like button is pressed twice, event handler props is called twice", async () => {
    const addLike = vi.fn()
    const user = userEvent.setup()

    const blog = {
      title: "title",
      author: "author",
      url: "url",
      user: {
        username: "testuser",
        name: "Test User",
      },
    }

    render(<Blog blog={blog} handleNewLike={addLike} />)

    screen.debug()

    const showButton = screen.getByText("Show")
    await user.click(showButton)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
