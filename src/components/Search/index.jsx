import React, { useState } from "react";
import {
  Fab,
  Paper,
  InputBase,
  CircularProgress,
  MenuItem,
  MenuList
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import clsx from "clsx";
import useStyles from "./styles";
import { useEffect } from "react";
import MapBoxAPI from "../../api/mapbox";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Search(props) {
  const { onChange, location: selectedLocation } = props;

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let shouldCallAPI = true;

    async function fetchData() {
      await sleep(500);

      if (shouldCallAPI) {
        if (!searchText.length) {
          setLocations([]);
        } else {
          try {
            setIsLoading(true);
            const data = await MapBoxAPI.getCoordinates(searchText);

            setLocations(data.features);
            if (data.features.length) {
              setIsMenuOpen(true);
            }
          } catch (err) {
            console.error(err.toString());
          } finally {
            setIsLoading(false);
          }
        }
      }
    }

    fetchData();

    return () => {
      shouldCallAPI = false;
    };
  }, [searchText]);

  useEffect(() => {
    if (!isOpen) {
      setLocations([]);
      setSearchText("");
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  const handleLocationClick = location => () => {
    onChange(location, location.center.longitude, location.center.latitude, location.boundingBox);
    setIsMenuOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Fab
          className={clsx(classes.searchIcon, {
            [classes["searchIcon--has-content"]]: isMenuOpen
          })}
          color="primary"
          aria-label="search"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <SearchRounded />
        </Fab>
        <Paper
          className={clsx(classes.wrapper, {
            [classes["wrapper--open"]]: isOpen,
            [classes["wrapper--has-content"]]: isMenuOpen
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
      {isOpen && isMenuOpen && (
        <Paper className={classes.locationWrapper}>
          <MenuList className={classes.locationWrapper}>
            {isOpen &&
              locations.map(location => (
                <MenuItem
                  key={location.id}
                  className={classes.locationField}
                  onClick={handleLocationClick(location)}
                >
                  {React.cloneElement(location.icon, {
                    className: classes.locationIcon
                  })}
                  {location.place_name}
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      )}
    </div>
  );
}

export default Search;
