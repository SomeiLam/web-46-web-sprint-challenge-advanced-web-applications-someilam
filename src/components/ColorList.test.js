import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { getByTestId, render, screen } from "@testing-library/react";
import ColorList from './ColorList';

const testColors = [
    {
        color: 'aliceblue',
        code: {
            hex: '#f0f8ff'
        },
        id: 1
    },
    {
        color: 'limegreen',
        code: {
            hex: '#99ddbc'
        },
        id: 2
    }
]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />);
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors} />);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={testColors} editing={true} />);
    const edit = screen.getByTestId('edit_menu');
    expect(edit).toBeInTheDocument();

    rerender(<ColorList colors={testColors} editing={false} />)
    expect(edit).not.toBeInTheDocument();
});
