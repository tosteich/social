import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default () => {
    return (
        <Container style={{marginTop: 96}}>
            <Typography variant="body1">
                Необходимо авторизоваться через&nbsp;
                <a href={"/oauth2/authorization/google"}>Google</a>
            </Typography>
        </Container>
    )
}