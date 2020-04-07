import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  typo: {
    color: theme.palette.text.hint,
    marginLeft: theme.spacing(3),
  },
  button: {
    // flexGrow: 1
    // width: theme.spacing(30),
    width: '88%',
    fontsize: '1.2em',
    height: theme.spacing(20),
    margin: theme.spacing(3),
    border: '3px solid',
    // boxShadow: theme.customShadows.widget,
    // textTransform: "none",
    // "&:active": {
    //   boxShadow: theme.customShadows.widgetWide,
    // },
  },
}));
