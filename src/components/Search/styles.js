import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 20,
    right: 20,
    display: "flex"
  },
  searchIcon: {},
  "searchIcon--open": {
    marginRight: theme.spacing(-4),
    zIndex: 2
  },
  wrapper: {
    width: 0,
    transition: "width 1s ease-in-out",
    height: theme.spacing(7)
  },
  'wrapper--open': {
    width: 400,
  },
  searchField: {
    marginLeft: theme.spacing(6),
    width: `calc( 100% - ${theme.spacing(8)}px )`,
    height: '100%',

  },
}));

export default useStyles;
