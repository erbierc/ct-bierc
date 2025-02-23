
import { Button, Container, createStyles, Fab, makeStyles, Theme, Typography } from '@material-ui/core'
import '../App.css'
import Ad from '../components/Ad';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { AdType, db } from '../db';
import AdModal from '../components/AdModal';
import { Link } from 'react-router-dom';

//Gotowe dane do podpięcia
const adsTemp = [
    {
      id: 1,
      name: "Super Sale Ad",
      content: "Huge discounts on all items! Limited time offer.",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-15"),
    },
    {
      id: 2,
      name: "New Arrival Ad",
      content: "Check out our latest collection of summer fashion.",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2024-04-30"),
    },
    {
      id: 3,
      name: "Tech Expo Ad",
      content: "Join us for the biggest tech expo of the year!",
      startDate: new Date("2024-05-10"),
      endDate: new Date("2024-05-12"),
    },
  ];
  
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonDiv: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center',
            margin: '1rem'
        },
        title: {
            marginTop: '1rem'
        }
    })
);


export default function AdPanel() {
    // Sprawdzenie, czy użytkownik jest zalogowany
    if (!localStorage.getItem('loggedIn'))
        window.location.href = "/"

    const [open, setOpen] = useState(false) // Otwieranie modalu kreacji/edycji reklam
    const [selectedAd, setSelectedAd] = useState<AdType | null>(null); // Reklama wybrana do edycji
    const ads = useLiveQuery(() => db.ads.toArray()) // Pobierane danych z IndexedDB
    const classes = useStyles();

    // Otwarcie modala do kreacji nowych reklam (pustego)
    const handleAddNewAd = () => {
        setSelectedAd(null);  // Ensure new ad form starts fresh
        setOpen(true);
    }
    // Otwarcie modala do edycji konkretnej reklamy
    const handleOpen = (ad: AdType) => {
        setSelectedAd(ad);
        setOpen(true);
    };
    // Zamknięcie modala i reset wybranej reklamy
    const handleClose = () => {
        setOpen(false);
        setSelectedAd(null);
    };

    return (
        <Container>
            <Typography variant="h5" className={classes.title}>
                Ads
            </Typography>
            <div className={classes.buttonDiv}>
                {/* Kreacja nowych reklam za pomocą modala */}
                <Fab color='primary' size="small" onClick={() => handleAddNewAd()}>
                    <AddIcon/>
                </Fab>
                <Link to="/panel/add">
                    <Button variant='contained' color='secondary' startIcon={<AddIcon />}>
                        Add from new window
                    </Button>
                </Link>
                <Button variant='contained' color='primary'>
                    Load exemplary data
                </Button>
            </div>
            <Container>
                <>
                    {ads?.map((ad) => {
                        return <Ad key={ad.id} ad={ad} setOpen={() => handleOpen(ad)} />
                    })}
                </>
            </Container>
            <AdModal open={open} handleClose={handleClose} selectedAd={selectedAd} />
        </Container>
    )
}
