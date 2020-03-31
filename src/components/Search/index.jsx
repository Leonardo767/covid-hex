import React, { useState } from "react";
import { Fab, Paper, InputBase, CircularProgress } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import clsx from "clsx";
import useStyles from "./styles";
import { useEffect } from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Search() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let shouldCallAPI = true;

    async function fetchData() {
      await sleep(500);

      if (shouldCallAPI && searchText.length) {
        try {
          setIsLoading(true);
          // Make our API Call

          await sleep(500);
          setIsLoading(false);
        } catch (err) {
          console.error(err.toString());
        }
      }
    }

    fetchData();

    return () => {
      shouldCallAPI = false;
      console.log("destroying on", searchText);
    };
  }, [searchText]);

  return (
    <div className={classes.root}>
      <Fab
        className={classes.searchIcon}
        color="primary"
        aria-label="search"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SearchRounded />
      </Fab>

      <Paper
        className={clsx(classes.wrapper, {
          [classes["wrapper--open"]]: isOpen
        })}
      >
        <InputBase
          className={classes.searchField}
          placeholder="City or State"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          fullWidth
        />
        {isLoading && <CircularProgress className={classes.searchLoader} />}
      </Paper>
    </div>
  );
}

export default Search;
