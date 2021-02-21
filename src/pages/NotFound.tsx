import React from "react";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
  },
  content: {
    textAlign: "center",
    margin: "5rem 0",
  },
});

function NotFound() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box mt="5rem">
      <Card raised className={classes.root}>
        <CardContent className={classes.content}>
          <Typography variant="h1" color="error">
            {t("pages.notFound.title")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotFound;
