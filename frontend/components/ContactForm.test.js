import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);

});

test('renders the contact form header', () => {
  render(<ContactForm />);
  const header = screen.getByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  userEvent.type(firstNameInput, 'Koko');

  const error = await screen.findAllByTestId('error');
  expect(error).toHaveLength(1);


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);
  const button = screen.getByRole('button');
  userEvent.click(button);

  const errors = await screen.findAllByTestId('error');
  expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  const lastNameInput = screen.getByLabelText('Last Name*');
  const button = screen.getByRole('button');

  userEvent.type(firstNameInput, 'Sachi');
  userEvent.type(lastNameInput, 'Komine');
  userEvent.click(button);

  const error = await screen.findAllByTestId('error');
  expect(error).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText('Email*');
  userEvent.type(emailInput, 'f');

  const error = screen.getByText('Error: email must be a valid email address.');

  expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const button = screen.getByRole('button');
  userEvent.click(button);

  const error = screen.getByText('Error: lastName is a required field.');

  expect(error).toBeInTheDocument();

});
test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  const lastNameInput = screen.getByLabelText('Last Name*');
  const emailInput = screen.getByLabelText('Email*');
  const button = screen.getByRole('button');


  userEvent.type(firstNameInput, 'Sachi');
  userEvent.type(lastNameInput, 'Komine');
  userEvent.type(emailInput, 'ksachi@mihama.co.jp');
  userEvent.click(button);

  const firstNameDisplay = screen.getByTestId('firstnameDisplay');
  const lastNameDisplay = screen.getByTestId('lastnameDisplay');
  const emailDisplay = screen.getByTestId('emailDisplay');
  const messageDisplay = screen.queryByTestId('messageDisplay');

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText('First Name*');
  const lastNameInput = screen.getByLabelText('Last Name*');
  const emailInput = screen.getByLabelText('Email*');
  const messageInput = screen.getByLabelText("Message");
  const button = screen.getByRole('button');

  userEvent.type(firstNameInput, 'USS  ');
  userEvent.type(lastNameInput, 'Bremerton');
  userEvent.type(emailInput, 'bremmygurl@azurlane.co.jp');
  userEvent.type(messageInput, 'Love you admiral~ <3');
  userEvent.click(button);

  const firstNameDisplay = screen.getByTestId('firstnameDisplay');
  const lastNameDisplay = screen.getByTestId('lastnameDisplay');
  const emailDisplay = screen.getByTestId('emailDisplay');
  const messageDisplay = screen.getByTestId('messageDisplay');

  expect(firstNameDisplay).toBeInTheDocument();
  expect(lastNameDisplay).toBeInTheDocument();
  expect(emailDisplay).toBeInTheDocument();
  expect(messageDisplay).toBeInTheDocument();
});