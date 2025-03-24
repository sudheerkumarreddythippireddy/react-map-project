import { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
`;

const LoginImage = styled.img`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
  }
`;

const Heading = styled.h2`
  font-family: 'Courier New', Courier, monospace;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  renderInputField = (label, type, value, onChange) => (
    <InputContainer>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </InputContainer>
  );

  render() {
    const { username, password } = this.state;
    return (
      <LoginContainer>
        <LoginImage src="https://res.cloudinary.com/dyqve00yx/image/upload/v1742717812/om59xngjmxesxwylxghl.jpg" alt="logo" height={400} width={350} />
        <FormContainer onSubmit={this.submitForm}>
          <Heading>Login</Heading>
          {this.renderInputField("USERNAME", "text", username, this.onChangeUsername)}
          {this.renderInputField("PASSWORD", "password", password, this.onChangePassword)}
          <Button type="submit">Login</Button>
        </FormContainer>
      </LoginContainer>
    );
  }
}

export default Login;
