import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollButtons from '../components/ScrollButtons';

test('renders ScrollButtons and triggers scroll functions', () => {
  render(<ScrollButtons />);

  const topButton = screen.getByText('Top');
  const bottomButton = screen.getByText('Bottom');

  fireEvent.click(topButton);
  fireEvent.click(bottomButton);

  expect(topButton).toBeInTheDocument();
  expect(bottomButton).toBeInTheDocument();
});