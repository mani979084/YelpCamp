import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#2d2d2e',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

const Spin = (props) => {

    const classes = useStylesFacebook();

    return (
        <>
            <div className='d-flex my-auto'>
                <div className={`${classes.root} mx-auto`}>
                    <CircularProgress
                        variant="determinate"
                        className={classes.bottom}
                        size={40}
                        thickness={4}
                        {...props}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        className={classes.top}
                        classes={{
                            circle: classes.circle,
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                    />
                </div>
            </div>
        </>
    )
}

export default Spin
