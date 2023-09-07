import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Fetch from '../components/Fetch.jsx';
import userEvent from '@testing-library/user-event';


const server = setupServer(
    rest.get('/test', (req, res, ctx) => {
        return res(ctx.json('test data'))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const user = userEvent.setup();

test('renders initial text', () => {
    render(<Fetch requestURL='/test' />)

    expect(screen.getByText(/no data/i)).toBeInTheDocument();
})

test('fetches data from request url', async () => {
    render(<Fetch requestURL='/test' />);

    await user.click(screen.getByRole("button", { name: /get data/i }));
    expect(screen.getByText(/test data/i)).toBeInTheDocument();
})
