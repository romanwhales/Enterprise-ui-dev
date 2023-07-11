import {Provider} from "react-redux" 
import { render as _render, screen,fireEvent, waitFor } from 'test/utilities';
import {PackingList} from '.';
import {createStore} from "./store"


const render:typeof _render = (Component,options) => {
  const store = createStore()
  const Wrapper = ({children}:any) => {
    return <Provider store={store}>{children}</Provider>
  }
  return _render(
    Component,{...options,wrapper: Wrapper}
  )
}
it('renders the Packing List application', () => {
  render(<Provider store={createStore()}><PackingList /></Provider>);
});

it('has the correct title', async () => {
  render(<PackingList />);
  // screen.debug()
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  const {getByPlaceholderText} = render(<PackingList/>)
  const newItemInput = getByPlaceholderText("New Item")
  expect(newItemInput).toBeInTheDocument()

});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    const {getByLabelText} = render(<PackingList/>)
    const addNewButton = getByLabelText("Add New Item")
    expect(addNewButton).toBeDisabled()
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {

    const {getByLabelText,getByPlaceholderText} = render(<PackingList/>)
    const newItemInput = getByPlaceholderText("New Item")

    const addNewButton = getByLabelText("Add New Item")
    fireEvent.change(newItemInput,{target: {value: "test"}})
   
    expect(addNewButton).not.toBeDisabled()
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const {getByLabelText,getByPlaceholderText,getByText} = render(<PackingList/>)
    const newItemInput = getByPlaceholderText("New Item")

    const addNewButton = getByLabelText("Add New Item")
    await fireEvent.change(newItemInput,{target: {value: "test"}})
    
    await fireEvent.click(addNewButton);
   expect(getByText("test")).toBeInTheDocument()
  },
);

it(
  'Removes an item',
  async () => {
    const {user} = render(<PackingList/>)
    const newItemInput = screen.getByLabelText("New Item Name")

    const addNewButton = screen.getByRole("button",{
      name: "Add New Item"
    })

    await user.type(newItemInput,'MacBook Pro')
    await user.click(addNewButton)

    // screen.debug()

   
   const removeButton = screen.getByRole('button', {
    name: 'Remove MacBook Pro',
  });
    
   await user.click(removeButton)
   await waitFor(() => expect(removeButton).not.toBeInTheDocument())
  },
);
