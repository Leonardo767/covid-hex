import React, { useState } from "react";
import { Fab, Paper, InputBase, CircularProgress } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";
import useStyles from "./styles";

function Search() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSearchTextChange(e) {
    const text = e.target.value;
    
    setSearchText(text);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div className={classes.root}>
      <Fab
        className={clsx(classes.searchIcon, {
          [classes["searchIcon--open"]]: isOpen
        })}
        color="primary"
        aria-label="search"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <SearchRounded />
      </Fab>

      {isOpen && (
        <Paper
          className={clsx(classes.wrapper, {
            [classes["wrapper--open"]]: isOpen
          })}
        >
          <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={option => option.name}
            options={["james", "patrick"]}
            loading={isLoading}
            renderInput={params => (
              <InputBase
                className={classes.searchField}
                placeholder="City or State"
                value={searchText}
                onChange={handleSearchTextChange}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading && (
                        <CircularProgress color="inherit" size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  )
                }}
                fullWidth
              />
            )}
          />
        </Paper>
      )}
    </div>
  );
}

export default Search;
