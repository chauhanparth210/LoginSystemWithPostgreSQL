import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { login } from "../store/actions/auth";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email...."
              name="email"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password...."
              type="password"
              name="password"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
