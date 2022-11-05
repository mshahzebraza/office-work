import { ApolloProvider } from "@apollo/client";
import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import projectTheme from '../client/theme/projectTheme';
import client from '../client/store/config';
import { retrieveApp } from "../client/handlers/all/retrieve";

function MyApp({ Component, pageProps }) {
    console.log('_app.js')
    useEffect(() => {
        retrieveApp() // Initialize the app data into app state.
    }, []);

    return (
        <ThemeProvider theme={projectTheme} >
            <CssBaseline />
            <ApolloProvider client={client} >
                <div id="portalRoot" style={{ position: 'absolute', zIndex: 1201 }} ></div>
                <Component {...pageProps} />
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default MyApp
