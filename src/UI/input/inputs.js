import { Form } from 'react-bootstrap';
import React from 'react';

const Input = (props) => (
  <Form.Group>
    <Form.Label>{props.Label}</Form.Label>
    <Form.Control
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
    <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
  </Form.Group>
);

export default Input;
