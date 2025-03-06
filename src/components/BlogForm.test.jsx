import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"
import { beforeEach } from "vitest"

describe("<BlogForm/>", () => {
  test("Check BlogForm calls handleNewBlog function correctly", async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()
    const blog = {
      title: "title",
      author: "author",
      url: "url",
    }

    render(<BlogForm handleNewBlog={addBlog} />)
    screen.debug()
    await user.type(screen.getByPlaceholderText("title"), blog.title)
    await user.type(screen.getByPlaceholderText("author"), blog.author)
    await user.type(screen.getByPlaceholderText("url"), blog.url)

    const submit = screen.getByText("Add Blog")

    await user.click(submit)
    console.log(addBlog.mock.calls)
    expect(addBlog).toHaveBeenCalledWith(blog)
  })
})
