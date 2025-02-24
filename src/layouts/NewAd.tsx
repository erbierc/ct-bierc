
import { Button, Card, Container, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import '../App.css'
import { AdType, db } from '../db';
import { SubmitHandler, useForm } from 'react-hook-form';
  
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            marginTop: '2rem',
            padding: '1rem'
          },
        title: {
            marginTop: '1rem'
        },
        form: {
            '& > *': {
              margin: theme.spacing(1),
              width: '25ch',
            },
        },
        textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        },
    })
);


export default function NewAd() {
    // Sprawdzenie, czy użytkownik jest zalogowany
    if (!localStorage.getItem('loggedIn'))
        window.location.href = "/ct-bierc"

    const classes = useStyles();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<AdType>()
    const onSubmit: SubmitHandler<AdType> = async (data) => {

        try {
            const id = await db.ads.add({
                name: data.name,
                content: data.content,
                startDate: data.startDate,
                endDate: data.endDate
            })
            alert("Ad successfully added! Id: " + id);
            reset();
            window.location.href = "/ct-bierc/panel"
        } catch (error) {
            console.error("Error adding ad:", error);
        }    
    }

    return (
        <Container>
            <Typography variant="h5" className={classes.title}>
                Create new ad
            </Typography>
            <Container>
                <Card className={classes.root}>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            {...register("name", { required: true })}
                            id="standard-basic"
                            label="Name"
                            defaultValue={""}
                        />
                        <TextField
                            {...register("content")}
                            id="standard-multiline-static"
                            label="Content"
                            multiline
                            inputProps={{ maxLength: 500 }}
                            defaultValue={""}
                        />
                        <TextField
                            {...register("startDate")}
                            id="startDate"
                            label="Start date"
                            type="date"
                            defaultValue={""}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            {...register("endDate")}
                            id="endDate"
                            label="End date"
                            type="date"
                            
                            defaultValue={""}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <Button type="submit" color='primary' variant="contained">Submit</Button>
                    </form>
                </Card>
            </Container>
        </Container>
    )
}
