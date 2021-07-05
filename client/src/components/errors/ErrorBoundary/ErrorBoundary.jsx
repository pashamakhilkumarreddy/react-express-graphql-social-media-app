import { Component } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Button, Icon } from "semantic-ui-react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(err) {
    console.error(err);
    return {
      hasError: true,
    };
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo);
  }

  render() {
    return this.state.hasError ? <Error /> : this.props.children;
  }
}

const Error = () => {
  return (
    <Segment textAlign="center" basic>
      <Header size="huge">It is not you. It is us.</Header>
      <Button as={Link} to="/">
        <Icon name="home" /> Go to Home!
      </Button>
    </Segment>
  );
};

export default ErrorBoundary;
