
import '../App.css'
import { useState, useEffect } from "react";
import { fetchQuote } from '../hooks/quotes';
import { Container, createStyles, makeStyles, Typography } from '@material-ui/core';

interface Quote {
  quote: string
  author: string
  category: string
}

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
    author: {
      marginTop: '1rem'
    }
  })
);


export default function MainLayout() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const classes = useStyles();

  useEffect(() => {
    async function getQuote() {
      const data = await fetchQuote();
      if (data) {
        setQuote(data);
      }
    }

      getQuote()
  }, []);
  console.log("main: ", quote)
  return (
    <Container className={classes.root}>
        <Typography variant="h3">
          {quote?.quote ? quote.quote : "It always seems impossible until it's done."}
        </Typography>
        <Typography variant="h6" className={classes.author}>
          {quote?.author ? quote.author : "Nelson Mandela"}
        </Typography>
    </Container>
  )
}
