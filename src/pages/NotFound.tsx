import React from "react";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
  },
  content: {
    textAlign: "center",
    margin: "5rem 0 5rem",
  },
});

function NotFound() {
  const classes = useStyles();
  return (
    <Box mt="5rem">
      <Card raised className={classes.root}>
        <CardContent className={classes.content}>
          <Typography variant="h1" color="error">
            Page Not Found
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotFound;
