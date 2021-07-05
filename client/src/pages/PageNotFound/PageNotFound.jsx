import { memo } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Button, Icon } from "semantic-ui-react";

const PageNotFound = () => {
  return (
    <Segment textAlign="center" basic>
      <Header size="huge">Page Not Found</Header>
      <Button as={Link} to="/">
        <Icon name="home" /> Take me back to Home!
      </Button>
    </Segment>
  );
};

export default memo(PageNotFound);
