import React from "react"
import { Menu, Props } from "./Menu"
import { render, fireEvent } from "@testing-library/react"

describe("<Menu />", () => {
  const setup = () => {
    const props: Props = {
      setPlayerAction: jest.fn(),
    }

    return {
      ...render(<Menu {...props} />),
      props,
    }
  }

  it("should call setPlayerAction with the selected value", () => {
    const { getByDisplayValue, props, queryByDisplayValue } = setup()
    const select = getByDisplayValue("Move")

    fireEvent.change(select, { target: { value: "attack" } })

    expect(props.setPlayerAction).toHaveBeenCalledWith("attack")
    expect(getByDisplayValue("Attack")).toBeInTheDocument()
    expect(queryByDisplayValue("Move")).not.toBeInTheDocument()
  })
})
