import React from 'react'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    embedContainer: {
        width: '100%',
        height: 0,
        position: 'relative',
        paddingBottom: '56.25%'
    },
    iframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

}));

export const YouTube = (props) => {
    const classes = useStyles();
    let parts = props.src.split('/');
    let lastPart = parts[parts.length - 1];
    let endUrl = (lastPart.indexOf("watch") > -1)? lastPart.slice(8): lastPart;
    const targetSrc = 'https://www.youtube.com/embed/' +  endUrl;

    return (
        <div className={classes.embedContainer}>
            <iframe
                className={classes.iframe}
                src={targetSrc}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
    )
}