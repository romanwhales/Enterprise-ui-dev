import {render,screen} from "./test/utilities"
import Counter from '.';



test('it should render the component', () => {
  const {user} = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  // const user = userEvent.setup();
  const {user} = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter/>)
  const textElement = screen.getByTestId("current-count")
  expect(textElement).toHaveTextContent('0')
  

});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const {user} = render(<Counter initialCount={4000}/>)
    // screen.debug()
    const resetButton = screen.getByRole('button',{
      name: "Reset"
    })
   
    const textElement = screen.getByTestId("current-count")
    await user.click(resetButton)
    expect(textElement).toHaveTextContent("0")

  },
);
