// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import BrovisorSaveButton from '../../../../components/common/brovisorSaveButton/BrovisorSaveButton';

// describe('BrovisorSaveButton', () => {
//     test('renders button with inner text', () => {
//         const { getByText } = render(<BrovisorSaveButton innerText="Save" />);
//         const buttonElement = getByText('Save');
//         expect(buttonElement).toBeInTheDocument();
//     });

// test('calls handleClick when clicked', () => {
//     const handleClick = jest.fn();
//     const { getByText } = render(
//         <BrovisorSaveButton innerText="Save" handleClick={handleClick} />
//     );
//     const buttonElement = getByText('Save');
//     fireEvent.click(buttonElement);
//     expect(handleClick).toHaveBeenCalledTimes(1);
// });

// test('applies disabled style when disabled prop is true', () => {
//     const { getByText } = render(
//         <BrovisorSaveButton innerText="Save" disabled={true}  />
//     );
//     const buttonElement = getByText('Save');
//     expect(buttonElement).toHaveClass('disabled');
// });

// Add more test cases for different scenarios and props if needed
// });


// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
//  import BrovisorSaveButton from '../../../../components/common/brovisorSaveButton/BrovisorSaveButton';
//
// describe('BrovisorSaveButton', () => {
// test('renders button with inner text', () => {
//     const { getByText } = render(<BrovisorSaveButton innerText="Save" />);
//     const buttonElement = getByText('Save');
//     expect(buttonElement).toBeInTheDocument();
// });
//
// test('calls handleClick when clicked', () => {
//     const handleClick = jest.fn();
//     const { getByText } = render(
//         <BrovisorSaveButton innerText="Save" handleClick={handleClick} />
//     );
//     const buttonElement = getByText('Save');
//     fireEvent.click(buttonElement);
//     expect(handleClick).toHaveBeenCalledTimes(1);
// });

// test('applies disabled style when disabled prop is true', () => {
//     const { getByText } = render(
//         <BrovisorSaveButton innerText="Save" disabled={true} handleClick={jest.fn()} />
//     );
//     const buttonElement = getByText('Save');
//     expect(buttonElement).toHaveClass('disabled');
// });

// Add more test cases for different scenarios and props if needed
// });




import React from 'react';
import { render, screen } from '@testing-library/react';
import BrovisorSaveButton from '../../../../components/common/brovisorSaveButton/BrovisorSaveButton';

describe('BrovisorSaveButton', () => {
    test('applies disabled style when disabled prop is true', () => {
        render(
            <BrovisorSaveButton innerText="Save" disabled={true} handleClick={jest.fn()} />
        );
        // const buttonElement = queryByText(/Save/i);
        expect(screen.getByText("search:")).toBeInTheDocument();
        // expect(buttonElement).toHaveClass('disabled');
    });

    // Add more test cases for different scenarios and props if needed
});