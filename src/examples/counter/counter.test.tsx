import { screen, fireEvent } from '@testing-library/react';
import {render} from "./test/utilities"
// import userEvent from '@testing-library/user-event';
import Counter from '.';

// @vitest-environment happy-dom

test('it should render the component', () => {
  
  render(<Counter/>)
 
});

test(
  'it should increment when the "Increment" button is pressed',
  async () => {
    const {user} =render(<Counter/>)
    const currentCount = screen.getByTestId("current-count")
    // screen.debug()
    expect(currentCount).toHaveTextContent("0")
    const button = screen.getByRole("button",{
      name: "Increment"
    })
    await user.click(button)
    expect(currentCount).toHaveTextContent("1")
    
  },
);
