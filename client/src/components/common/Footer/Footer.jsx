import { memo } from "react";
import { Segment } from "semantic-ui-react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  footer: {
    position: "absolute !important",
    width: "100vw",
    bottom: "-6rem",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const PageFooter = () => {
  const styles = useStyles();
  return (
    <Segment
      padded
      as="footer"
      size="huge"
      textAlign="center"
      className={styles.footer}
    >
      &copy; 2021 React Express GraphQL Social Media Application
    </Segment>
  );
};

export default memo(PageFooter);
