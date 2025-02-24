
import '../App.css'
import { useState, useEffect } from "react";
import { fetchQuote } from '../hooks/quotes';
import { Container, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

interface Quote {
  quote: string
  author: string
  category: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    author: {
      marginTop: '1rem'
    },
    quote: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem'
      }
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
        <Typography variant="h3" className={classes.quote}>
          {quote?.quote ? quote.quote : "It always seems impossible until it's done."}
        </Typography>
        <Typography variant="h6" className={classes.author}>
          {quote?.author ? quote.author : "Nelson Mandela"}
        </Typography>
    </Container>
  )
}
