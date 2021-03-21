import React, {useState} from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {YouTube} from "./YouTube";
import Grid from "@material-ui/core/Grid";


export const Media = (props) => {
    const getLinkType = () => {
        if (props.message.link.indexOf('youtu') > -1) {
            return 'youtube'
        } else if (props.message.link.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            return 'image'
        } else {
            return 'href'
        }
    }
    const [type, setType] = useState(getLinkType());

    return (
        <Grid item xs={12} sm={10} md={8} lg={6} style={{margin: 'auto'}}>
            <Card variant="outlined" style={{border: 'none'}
            }>
                {type === 'href' && (
                    <CardContent>
                        {props.message.linkCover &&(
                            <CardMedia image={props.message.linkCover} style={{paddingTop: '36%'}}/>
                        )}
                        <a href={props.message.link}>{props.message.linkTitle? props.message.linkTitle: props.message.link}</a>
                        {props.message.linkDescription &&(
                            <div>{props.message.linkDescription}</div>
                        )}
                    </CardContent>
                )}
                {type === 'image' && (
                    <CardContent>
                        <a href={props.message.link}>
                            <CardMedia image={props.message.linkCover} style={{paddingTop: '36%'}}/>
                        {props.message.link}
                        </a>
                    </CardContent>
                )}
                {type === 'youtube' && (
                    <CardContent>
                        <YouTube src={props.message.link}/>
                    </CardContent>
                )}
            </Card>
        </Grid>
    )
}