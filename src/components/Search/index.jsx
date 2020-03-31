import React, { useState } from "react";
import { Fab, Paper, InputBase, CircularProgress, TextField, MenuItem, MenuList } from "@material-ui/core";
import { SearchRounded, Explore } from "@material-ui/icons";
import clsx from "clsx";
import useStyles from "./styles";
import { useEffect } from "react";
import MapBoxAPI from "../../api/mapbox";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Search() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([])

  useEffect(() => {
    let shouldCallAPI = true;

    async function fetchData() {
      await sleep(500);

      if (shouldCallAPI && searchText.length) {
        try {
          setIsLoading(true);
          const data = await MapBoxAPI.getCoordinates(searchText);
          console.log("data in api", data);

          setLocations(data.features)

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
      <div>
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

      {isOpen && locations.length > 0 && (
        <Paper
          className={classes.locationWrapper}
        >
        <MenuList className={classes.locationWrapper}>
          {isOpen && locations.map((location, i) => (
            <MenuItem className={classes.locationField} key={i}>
              <Explore className={classes.locationIcon}/>
              {location.place_name}
            </MenuItem>            
          ))}
        </MenuList>
        </Paper>
      )}
      </div>
    </div>
  );
}

export default Search;
