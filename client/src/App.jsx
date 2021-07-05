import { Container } from "semantic-ui-react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <Header />
      <Container as="main" fluid={false} className="container">
        <Routes />
      </Container>
      <Footer />
    </>
  );
};

export default App;
