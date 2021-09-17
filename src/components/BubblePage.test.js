import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from './BubblePage';
import ColorList from './ColorList'

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

test("Renders without errors", () => {
    render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {
    const mockColors = jest.fn(() => {
        return testColors
    })
    render(<ColorList colors={mockColors()} />)
    await waitFor(() => {
        const colorsTest = screen.queryAllByTestId('color');
        expect(colorsTest).toHaveLength(2);
    })
});