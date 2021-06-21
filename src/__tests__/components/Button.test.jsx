import React from 'react';
import { render } from '@testing-library/react';

import {
  SuccessButton,
  PrimaryButton,
  DangerButton,
  InfoButton,
  WarningButton,
} from '@/components/Button';

test('Renders Success Button', () => {
  const { container } = render(<SuccessButton>Hello world</SuccessButton>);
  expect(container).toMatchSnapshot();
});

test('Renders Primary Button', () => {
  const { container } = render(<PrimaryButton>Hello World</PrimaryButton>);
  expect(container).toMatchSnapshot();
});

test('Renders Danger Button', () => {
  const { container } = render(<DangerButton>Hello World</DangerButton>);
  expect(container).toMatchSnapshot();
});

test('Renders Info Button', () => {
  const { container } = render(<InfoButton>Hello World</InfoButton>);
  expect(container).toMatchSnapshot();
});

test('Renders Warning Button', () => {
  const { container } = render(<WarningButton>Hello World</WarningButton>);
  expect(container).toMatchSnapshot();
});
