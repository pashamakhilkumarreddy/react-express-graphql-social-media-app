import { Segment, Dimmer, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

const PageLoader = (showLoaderText = false, ...props) => {
  return (
    <Segment>
      <Dimmer active>
        <Loader> {showLoaderText ? "Loading" : ""} </Loader>
      </Dimmer>
    </Segment>
  );
};

PageLoader.propTypes = {
  showLoaderText: PropTypes.bool,
  props: PropTypes.any,
};

export default PageLoader;
