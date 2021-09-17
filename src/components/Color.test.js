import React, { Component } from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const blankColor = {
    color: '',
    code: {
        hex: ''
    },
    id: null
}

const testColor = {
    color: 'aliceblue',
    code: {
        hex: '#f0f8ff'
    },
    id: 1
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={blankColor} />);
});

test("Renders the color passed into component", () => {
    render(<Color color={testColor} />);
    const color = screen.getByText(/aliceblue/i);
    expect(color).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockToggleEdit = jest.fn();
    const mockDeleteColor = jest.fn();

    render(<Color color={testColor} toggleEdit={mockToggleEdit} deleteColor={mockDeleteColor} />);
    const deleteColor = screen.getByText(/x/i);
    userEvent.click(deleteColor);
    expect(mockToggleEdit).toBeCalledTimes(1);
    expect(mockDeleteColor).toBeCalledTimes(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor = jest.fn();
    const mockToggleEdit = jest.fn();

    render(<Color color={testColor} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit} />);
    const colorDiv = screen.getByTestId('color');
    userEvent.click(colorDiv);
    expect(mockSetEditColor).toBeCalledTimes(1);
    expect(mockToggleEdit).toBeCalledTimes(1);
});