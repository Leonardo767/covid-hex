import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(3) + theme.spacing(4),
    zIndex: 2
  },
  search: {
    display: "flex"
  },
  searchIcon: {
    transition: 'all 0.2s ease-in-out',
  },
  "searchIcon--has-content": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  wrapper: {
    width: 400,
    maxWidth: 0,
    transition: "all 0.5s ease-in-out",
    height: theme.spacing(7),
    borderRadius: theme.spacing(4),
    display: "flex"
  },
  "wrapper--open": {
    maxWidth: 400,
    paddingLeft: theme.spacing(7),
    marginLeft: theme.spacing(-6)
  },
  "wrapper--has-content": {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  searchField: {
    height: "100%",
    width: `calc( 100% - ${theme.spacing(7)}px)`
  },
  searchLoader: {
    width: "30px !important",
    height: "30px !important",
    color: "white",
    position: "absolute",
    right: 15,
    top: 13
  },
  locationWrapper: {
    maxWidth: 464,
    alignItems: "center",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  locationField: {
    width: `100%`,
    height: "100%"
  },
  locationIcon: {
    margin: "16px"
  }
}));

export default useStyles;
