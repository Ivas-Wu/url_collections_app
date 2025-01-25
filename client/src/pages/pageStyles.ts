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