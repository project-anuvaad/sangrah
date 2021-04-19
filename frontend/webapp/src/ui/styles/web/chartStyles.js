const FileUploadStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    container: {
      padding: '0 15px'
    },

    margin: {
      margin: theme.spacing(1),
      width: '100%'
    },
    withoutLabel: {
      marginTop: theme.spacing(2)
    },
    card:{
      display: 'flex', 
      flexDirection: 'column', 
      flex: 1, 
      alignItems: 'start', 
      // paddingTop: isMobile ? "0%" : "5%", 
      width:'100%',
      backgroundColor: '#ffffff',
      padding: '0',
      boxSizing: 'border-box',
      borderRadius: '.5rem',
      border: '1px solid #EEEEF0',
      minHeight: '38.75rem'
    },
    typographyHeader:{
     
      fontSize: 20,
  '@media (min-width:600px)': {
    fontSize: 24,
  }
  
      
  
    },
    typographySubHeader:{
    textAlign:'center',
      fontWeight:'450',
      color:'#000000'
    },
  
    typography: {
     // marginLeft:"2%",
      marginTop:'1.7%',
      marginBottom:'2%',
      height:"18px"
      
    },
    select:{
      // marginRight: "30%",
      width:"100%" ,
      height:'40px',
    
      
    },
   paper: {
    
      width: "100%",
      minWidth: "250px",
      marginTop: "",
      marginTop:'3em',
      padding: "0",
      // marginLeft: "15%",
      boxShadow: 'none',
      backgroundColor: 'transparent',
      minHeight:'400px',
      padding:'1rem',
      boxSizing: 'border-box'

    },
    
    grid:{
      marginLeft: "5.5%" 
    },
    textfield:{
      width: '95%',
      //marginLeft:"1%"
    },
    span:{
      color:'red'
    },
    cursor:{
      cursor:"pointer"
    },
    button
    : {
      textTransform: "capitalize"
    },
    toggleButton:{
      display: "flex", flexDirection: "row-reverse", width: "100%",
    },
    button1: {
      //marginTop: "9%",
     marginLeft:'6.3%',
      width: "92.7%",
      backgroundColor:'#1C9AB7',
      borderRadius:"20px 20px 20px 20px",
      color:"#FFFFFF",
      height:'46px'
    },
    button2: {
      //arginTop: "9%",
      marginLeft: "5%",
      width: "88%",
      backgroundColor:'#1C9AB7',
      borderRadius:"20px 20px 20px 20px",
      color:"#FFFFFF",
      height:'46px'
    },

    buttonActive:
    {
      backgroundColor: "#1c9ab7", color: "white"
    },
    buttonDeactive:{
      color: "black"
    },
    

    
    // dropZoneArea:{

      
    //   paddingTop: '13%',
    //   top: "auto",
    //   width:'91%',
    //   minHeight:'340px',
    //   height: "100%",
    //   borderColor:'#1C9AB7',
    //   backgroundColor: '#F5F9FA',
    //   border: '1px dashed #1C9AB7',
    //   fontColor:'#1C9AB7',
    //   "& svg":{color:'#1C9AB7',},
    //   "& p": {
    //     textOverflow: "ellipsis",
    //     whiteSpace: "nowrap",
    //     overflow: "hidden",
    //     fontSize: "19px",
    //     color:'#1C9AB7',
        
    //   }
    // }

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
    btn: {
       
      // minHeight: "30px"
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
      minHeight:"3.5rem"
    }

  });
  
  
  export default FileUploadStyles;
  