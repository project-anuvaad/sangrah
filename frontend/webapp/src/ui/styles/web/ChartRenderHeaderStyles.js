const ChartRenderHeaderStyles = theme => ({
    container: {},
    containerDemo: {},
    appBar: {
       boxShadow: 'none',
       borderBottom: '1px solid #EEEEF0',
       padding: '0 3.125rem'
    },
    appBarShift: {},
    buttonLeft: {},
    buttonRight: {},
    editButton: {},
    hide: {},
    drawer: {},
    drawerPaper: {},
    drawerHeader: {
        display: "flex", 
        flexDirection: "row"
    },
    contentShift: {},
    drawerPaperClose: {},
    title: {},
    content: {},

    root: {
        flexGrow: 1,

    },
    flex: {
        flex: 1,

    },
    felxDemo: {
        flex: 1,
        marginLeft: "1%"
    },
    menuButton: {
        marginLeft: -12,
        // marginRight: 20,
        marginRight: "8px !important",
    },
    divider: {
        marginLeft: '12%',
        marginRight: '12%'
    },
    toolbar: {
        minHeight: "56px"
    }

})

export default ChartRenderHeaderStyles;