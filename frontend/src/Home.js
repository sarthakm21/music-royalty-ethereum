import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import MusicLogo from "./assets/music.svg";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  BannerImg: {
    width: "100%",
    maxHeight: "100vh",
  },
  linkTag: {
    textDecoration: "none",
    color: "inherit",
    "&::after": {
      content: "''",
      display: "block",
      borderBottom: "solid 3px #FF1E56",
      transform: "scaleX(0)",
      transition: "transform 250ms ease-in-out",
      transformOrigin: "100% 50%",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
      transformOrigin: "0 50%",
    },
  },
  footerLink: {
    textDecoration: "none",
    color: "inherit",
  },
  headingText: {
    fontWeight: "800",
    fontSize: "16px",
    letterSpacing: "5px",
    color: "#1D1D1D",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  navWrapper: {
    width: "100%",
  },
  navDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    top: "20px",
    width: "calc(100%/12*7)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  landing: {
    display: "flex",
    // position:"absolute",
    height: "100vh",
    width: "98.5vw",
    marginLeft: "auto",
    alignItems: "center",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      // flexDirection:"column"
      display: "block",
    },
  },
  logoContainer: {
    flex: "80%",
    width: "100%",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: "30vh",
    },
  },
  tagline: {
    position: "absolute",
    zIndex: "-200",
    // width:"1200px",
    left: "15vw",
    // marginRight:"60px",
    letterSpacing: "5px",
    fontWeight: "600",
    [theme.breakpoints.up("sm")]: {
      left: "23vw",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      left: "0",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },
  extendedBack: {
    background:
      "linear-gradient(87.22deg , #FFAC41 10.57%, rgba(255, 30, 86, 0.74) 133.29%)",
    padding: "10px 15vw 10px 20px",
    borderRadius: "20px",
    // width:"800px"
  },
  rotatedContainer: {
    // display:"none",
    // flex:"50%",
    position: "relative",
    height: "200vh",
    width: "95vw",
    zIndex: "-100",
    right: "-10vw",
    textAlign: "center",
    backgroundColor: "#FFAC41",
    transform: "rotate(20deg)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    // transform: "scaleX(10)"
  },
  textOnRotated: {
    textAlign: "center",
    marginTop: "10vh",
    fontWeight: "600",
    fontSize: "22px",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "30vw",
      right: "10vw",
    },
  },
  logoImg: {
    width: "30vw",
    minWidth: "300px",
  },
  roleDesc: {
    display: "flex",
    alignItems: "center",
    width: "85vw",
    margin: "4% auto",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      paddingBottom: "2.5rem",
      margin: "0 auto",
    },
  },
  SectionHeading: {
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "29.26px",
    letterSpacing: "0.05em",
    textAlign: "left",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  SectionText: {
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "29px",
    letterSpacing: "0.05em",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      textAlign: "justify",
      fontSize: "15px",
      lineHeight: "24px",
    },
  },
  SectionTextWrapper: {
    textAlign: "left",
    padding: "0 40px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 20px",
    },
  },
  SectionLinkWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "20px",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  SectionLinkTag: {
    textDecoration: "none",
    color: "#000000",
    background:
      "linear-gradient(87.22deg, #FFAC41 10.57%, rgba(255, 30, 86, 0.74) 133.29%)",
    padding: "10px 20px",
    borderRadius: "50px",
    marginRight: "30px",
    transition: "all 0.15s ease-in",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.12)",
      transform: "translateY(-1.5px) scale(1.05)",
    },
    "&:active": {
      boxShadow: "0 1px 15px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.12)",
      transform: "translateY(1px) scale(1)",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "10px",
    },
  },
  SectionLinkText: {
    fontWeight: "600",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item md={4}></Grid>
        <Grid item md={8}>
          <div className={classes.navWrapper}>
            <div className={classes.navDiv}>
              <Link to="/register" id="nav-item" className={classes.linkTag}>
                <Typography className={classes.headingText}>
                  REGISTER MUSIC
                </Typography>
              </Link>
              <Link to="/buy" id="nav-item" className={classes.linkTag}>
                <Typography className={classes.headingText}>
                  BUY MUSIC
                </Typography>
              </Link>
              <Link to="/claim" id="nav-item" className={classes.linkTag}>
                <Typography className={classes.headingText}>
                  CLAIM ROYALTIES
                </Typography>
              </Link>
              <Link to="/songs" id="nav-item" className={classes.linkTag}>
                <Typography className={classes.headingText}>
                  YOUR SONGS
                </Typography>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={classes.landing}>
        <div className={classes.logoContainer}>
          <img src={MusicLogo} className={classes.logoImg} alt="logo" />
        </div>
        <div className={classes.rotatedContainer}></div>
        <Typography className={classes.textOnRotated}>
          No more exploitation by music labels. Decide how much you get paid for
          your content and get your fair share of royalties
        </Typography>
      </div>
    </>
  );
};

export default Home;
