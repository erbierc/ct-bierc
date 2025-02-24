
import '../App.css'
import { Container, createStyles, makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "90vh", // Full viewport height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Centers content vertically
      alignItems: "center", // Centers content horizontally
      textAlign: "center", // Ensures text is centered
    },
  })
);



export default function NoMatch() {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <ErrorIcon fontSize='large' />
            <Typography variant="h3">
                Error 404. <Link to="/">Go back.</Link>
            </Typography>
        </Container>
    )
}
