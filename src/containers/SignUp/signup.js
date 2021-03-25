import Layout from '../../components/Layout/layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../UI/input/inputs';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signup } from '../../actions/userActions';
import React from 'react';

// signup template functional component
const SignUp = () => {
  // set form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // dispatch actions
  const dispatch = useDispatch();
  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  // user (user Reducer name)
  const user = useSelector((state) => state.user);

  // auth ( auth reducer name)
  const auth = useSelector((state) => state.auth);

  // if authenticated(login) redirect to home page
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  // user singup functional component
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '30px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                Buttonvariant="primary"
                type="submit"
                onClick={userSignup}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
