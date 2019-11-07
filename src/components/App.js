import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import OauthButton from './OauthButton';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const App = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Seminar
                    </Typography>
                    <OauthButton/>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    {
                        props.user ? <Dashboard user={props.user} /> : ''
                    }
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps)(App);