
import { useForm } from "react-hook-form"
import { Button, Container, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import '../App.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
          display: 'flex',
          alignItems: 'center',
        },
      },
      textField: {
        '& .MuiInput-underline:before': {
          borderBottom: '1px solid white',
        },
        '& .MuiInput-underline:after': {
          borderBottom: '2px solid white',
        },
        '& input': {
          color: 'white',
        },
      },
      title: {
        margin: '1rem'
      }
    }),
  );



export default function LoginLayout() {
    const classes = useStyles();

    const {
      register,
      handleSubmit,
    } = useForm<{password: string}>()

    return (
        <Container>
            <Typography variant="h4" className={classes.title}>
              To access the Ad Management Panel, enter your password:
            </Typography>
            <form className={classes.root} id="login-form" noValidate autoComplete="off" onSubmit={handleSubmit((data) => {
              if (data.password == import.meta.env.VITE_APP_PASS) {
                localStorage.setItem('loggedIn', 'true') 
                window.location.href = "/ct-bierc/panel"
              } else
                window.location.href = "/ct-bierc/error"
            })}>
                <TextField
                    {...register("password", { required: true })}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    InputLabelProps={{
                      style: { color: "white" }, // Make the label white
                    }}
                    InputProps={{
                      style: { color: "white" }, // Make the input text white
                    }}
                />
                <Button type="submit" variant="contained" color='primary'>Submit</Button>
            </form>
        </Container>
    )
}
