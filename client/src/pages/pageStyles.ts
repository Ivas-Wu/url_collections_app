import pattern from '../assets/dot-grid.webp';

export const pageBaseStyles = {
    container: {
        paddingTop: '3em',
        height: '100%',
        minHeight: '100vh',
        backgroundSize: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
    },
    title: {
        margin: '2em',
        gap: '2em',
        "@media (min-width: 0px)": {
            padding: '1em',
            width: '90%',
        },
        "@media (min-width: 600px)": {
            padding: '1em',
            width: '75%',
        },
        "@media (min-width: 1200px)": {
            padding: '1.5em',
            width: '40%',
        },
        "@media (min-width: 2400px)": {
            padding: '2em',
            width: '25%',
        },
    }
}

export const landingPageStyles = {
    topContainer: {
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        padding: "1.5em",
        "@media (min-width: 600px)": {
            padding: "2em",
            maxWidth: '100%',
        },
        "@media (min-width: 1200px)": {
            padding: "4em",
            maxWidth: '100%',
        },
        "@media (min-width: 2400px)": {
            padding: "6em",
            maxWidth: '100%',
        },
    },
    titleText: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2em',
        width: '100%',
        "@media (min-width: 600px)": {
            width: '75%',
        },
        "@media (min-width: 1200px)": {
            width: '50%',
        },
        "@media (min-width: 2400px)": {
            width: '40%',
        },
    },
    titleTextTitle: {
        fontWeight: 600,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '60px',
        pt: '20px',
        "@media (min-width: 600px)": {
            fontSize: '72px',
        },
        "@media (min-width: 1200px)": {
            fontSize: '84px',
        },
        "@media (min-width: 2400px)": {
            fontSize: '96px',
        },
    },
    titleTextSubtitle: {
        fontWeight: 500,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px',
        pt: '10px',
        pb: '20px',
        "@media (min-width: 600px)": {
            fontSize: '28px',
        },
        "@media (min-width: 1200px)": {
            fontSize: '32px',
        },
        "@media (min-width: 2400px)": {
            fontSize: '36px',
        },
    },
    titleButton: {
        backgroundColor: 'secondary.main',
        color: 'secondary.dark',
        fontWeight: 400,
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: '4px',
        width: 'fit-content',
        '&:hover': {
            backgroundColor: 'secondary.dark',
            color: 'secondary.contrastText',
        },
        fontSize: '20px',
        "@media (min-width: 600px)": {
            fontSize: '24px',
        },
    },
    navigationCard: {
        width: '-webkit-fill-available',
        perspective: 1000,
        margin: '1em',
        // height: 100,
        // "@media (min-width: 600px)": {
        //     height: 200
        // },
        // "@media (min-width: 1200px)": {
        //     height: 300
        // },
        // "@media (min-width: 2400px)": {
        //     height: 400
        // },
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        pt: '5em',
        gap: '2em',
        "@media (min-width: 600px)": {
            padding: "2em",
            maxWidth: '100%',
        },
        "@media (min-width: 1200px)": {
            padding: "4em",
            maxWidth: '100%',
        },
        "@media (min-width: 2400px)": {
            padding: "6em",
            maxWidth: '100%',
        },
    },
    detailsTitle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        pl: '1em',
        pr: '1em',
        pb: '2em',
        textAlign: 'center',
        "@media (min-width: 600px)": {
            pl: '10%',
            pr: '10%',
        },
        "@media (min-width: 1200px)": {
            pl: '20%',
            pr: '20%',
        },
        "@media (min-width: 2400px)": {
            pl: '30%',
            pr: '30%',
        },
    },
    bodyBox: {
        // display: 'flex',
        // justifyContent: 'center',
        // flexDirection: 'colu',
        // flexWrap: 'nowrap',
    },
    detailsBox: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1em',
        flexWrap: 'nowrap',
        "@media (min-width: 600px)": {
            flexDirection: 'row',
            mb: '2em',
        },
    },
    detailsBoxItems: {
        "@media (min-width: 600px)": {
            pl: '1em',
            mt: '2em'
        },
    },
    textSubtitle: {
        fontWeight: 400,
        fontFamily: 'Roboto, sans-serif',
        pb: '0.5em',
    },
    textBody: {
        pt: '0.8em',
        fontWeight: 300,
        fontFamily: 'Roboto, sans-serif',
    },
}