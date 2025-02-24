import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
  }),
);

export default function Nav() {
  const classes = useStyles();
  let url = ""
  if (localStorage.getItem('loggedIn'))
    url = "/panel"
  else url = "/login"

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CloudCircleIcon /> 
            <Typography variant="h6" className={classes.title}>
                <Link to="/">
                    CT Ad Management Panel
                </Link>
            </Typography>
            <div>
                <Tooltip title="Access panel">
                    <IconButton
                        component={Link}
                        to={url}
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
            </div>
            {localStorage.getItem('loggedIn') && 
              <div>
                <Tooltip title="Log out">
                  <IconButton onClick={() => {localStorage.removeItem('loggedIn'); window.location.href="/"}}>
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </div>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
