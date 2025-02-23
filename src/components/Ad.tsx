import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AdType, db } from "../db";


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: '2rem'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

interface Props {
    ad: AdType
    setOpen: () => void
}

export default function Ad(props: Props) {
  const classes = useStyles();

  const deleteAd = async () => {
    let delText = "Are you sure you want to delete " + props.ad.name + "?"
    if (confirm(delText) == true)
      try {
        await db.ads.delete(props.ad.id)
        alert("Ad successfully deleted!");
      }
      catch(error) {
        alert("Something went wrong with deleting the ad...")
      }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        {props.ad.startDate && props.ad.endDate &&
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.ad.startDate} - {props.ad.endDate}
          </Typography>
        }
        
        <Typography variant="h5" component="h2">
          {props.ad.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.ad.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={props.setOpen} variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button>
        <Button onClick={deleteAd} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
      </CardActions>
    </Card>
  );
}