import { screen, render, fireEvent } from '@testing-library/react';
import SelectColor from '../components/SelectColor.jsx'

test('change colors', () => {
    render(<SelectColor />);

    fireEvent.change(screen.getByRole('combobox', { name: /select a color/i }), { target: { value: 'green' } });
    expect(screen.getByText(/green/i, { selector: 'span' })).toBeInTheDocument();
})

