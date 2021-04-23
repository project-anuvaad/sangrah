const FileUploadStyles = theme => ({
    container: {
      padding: '0 15px'
    },
    card:{
      display: 'flex', 
      flexDirection: 'column', 
      flex: 1, 
      alignItems: 'start', 
      width:'100%',
      backgroundColor: '#ffffff',
      padding: '0',
      boxSizing: 'border-box',
      borderRadius: '.5rem',
      border: '1px solid #EEEEF0',
      minHeight: '38.75rem'
    },
   paper: {
      width: "100%",
      minWidth: "250px",
      marginTop: "",
      marginTop:'3em',
      padding: "0",
      boxShadow: 'none',
      backgroundColor: 'transparent',
      minHeight:'400px',
      padding:'1rem',
      boxSizing: 'border-box'
    },
    cursor:{
      cursor:"pointer"
    },
    title: {
      textAlign: "left", 
    },

    langPairButtons: {
      display: "flex", 
      justifyContent: 'flex-end', 
      width: "100%",
      padding:'.6rem 1rem',
      boxSizing: 'border-box'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #EEEEF0',
      padding: '.6rem 1rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    backButton: {
      boxShadow: 'none',
      backgroundColor: '#F0F1F3',
      color: '#0C0F0F',
      padding: '.5rem .625rem',
      marginRight: '.5rem'
    },
    seperator: {
      width: '1px',
      height: '2rem',
      backgroundColor: '#DADCE0',
      margin: '0 1rem',
      fontSize: '.75rem'
    },
    cardHeaderContainer: {
      display: "flex", 
      flexDirection: "row",
      minHeight:"2.3rem"
    }

  });
  
  
  export default FileUploadStyles;
  