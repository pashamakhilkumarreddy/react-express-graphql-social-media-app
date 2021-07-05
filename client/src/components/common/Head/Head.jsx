import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} | React Express GraphQL Social Media`}</title>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Head;
