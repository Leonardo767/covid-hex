import React from "react";
import { Source, Layer } from "react-map-gl";
import $ from "jquery";
// import CountyColors from "./countyColors";

class CountyRender extends React.Component {
  constructor() {
    super();
    this.state = {
      county_colors: {},
      mapData: {},
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    console.log("Did mount in counties.js");
    const query0 = "date=2020-03-21T00:00:00.000";
    const query7 =
      "$where=date between '2020-01-01T12:00:00' and '2020-04-18T14:00:00'";
    const url =
      "https://internal.chattadata.org/resource/unyk-9b2k.json?" + query7;
    $.ajax({
      url: url,
      type: "GET",
      data: {
        $limit: 100000,
        $$app_token: process.env.REACT_APP_SOCRATA_TOKEN,
      },
    }).done((data) => {
      const [color_map, parsedData] = this.buildLayer(data);
      this.setState({
        isLoaded: true,
        county_colors: color_map,
        mapData: parsedData,
      });
    });
  }

  buildLayer(data) {
    function determineColor(numCases) {
      // 10,  100,  1000, 10000, 100000,  1000000
      // 0/5, 1/5,  2/5,  3/5,   4/5,     5/5
      const lvls = [0, 1, 2, 3, 4, 5];
      for (var lvl in lvls) {
        if (numCases < Math.pow(10, lvl)) {
          var satLvl = (lvl * 100) / (lvls.length - 1);
          var alpha = (lvl * 0.7) / (lvls.length - 1);
          break;
        }
      }
      var colorCalc = "hsla(0, " + satLvl + "%, 30%, " + alpha + ")";
      return colorCalc;
    }

    const case_dict = this.getLatestPerCounty(data);
    var expression = ["match", ["get", "GEOID"]];
    // data.forEach((row) => {
    //   var red = (row["cases"] / 200) * 255;
    //   var color = "rgba(" + red + ", " + 0 + ", " + 0 + ", 0.5)";
    //   expression.push(row["fips"], color);
    // });
    for (const fips in case_dict) {
      // var red = determineColor(case_dict[fips]["cases"]);
      var color = determineColor(case_dict[fips]["cases"]);
      // var color = "rgba(" + red + ", " + 0 + ", " + 0 + ", 0.5)";
      expression.push(case_dict[fips]["geoid"], color);
    }
    expression.push("rgba(0,0,0,0)");
    return [expression, case_dict];
  }

  getLatestPerCounty(data) {
    function parseDate(entryDate) {
      // converts datestring to a numerical representation of days/months since 2020
      const cnt =
        parseInt(entryDate.substring(5, 7)) * 32 +
        parseInt(entryDate.substring(8, 10));
      return cnt;
    }
    function convertToGeoid(fipsEntry) {
      var fipsNew = fipsEntry;
      if (fipsEntry.length < 5) {
        var fipsNew = "0" + fipsEntry;
      }
      return fipsNew;
    }
    function newCaseCountEntry(dataEntry) {
      // const dateParsed = parseDate(dataEntry["date"]);
      return {
        date: dataEntry["date"].substring(0, 10),
        cases: dataEntry["cases"],
        geoid: convertToGeoid(dataEntry["fips"]),
      };
    }
    console.log(data);
    var case_count = new Object();
    data.forEach((entry) => {
      const fips = entry["fips"];
      if (case_count.hasOwnProperty(fips)) {
        if (parseDate(case_count[fips]["date"]) > parseDate(entry["date"])) {
          // we've already logged a more recent date, skip
          return;
        }
      }
      case_count[fips] = newCaseCountEntry(entry);
    });
    console.log(case_count);
    return case_count;
  }

  render() {
    // console.log(this.state.county_colors);
    return (
      <div>
        <Source
          id="counties"
          type="geojson"
          data="https://raw.githubusercontent.com/lobenichou/dataForGuides/master/countiesAndResults.geojson"
          generateId={true}
        />
        {/* <Source
          id="covid"
          type="json"
          url="https://internal.chattadata.org/resource/unyk-9b2k.json"
        /> */}
        {/* <Layer {...layer_define} /> */}
        <Layer
          id="counties"
          type="fill"
          source="counties"
          // source-layer="state_county_population_2014_cen"
          paint={{
            "fill-color": this.state.county_colors,
            "fill-outline-color": "rgba(158, 158, 158, 0.5)",
          }}
        />
      </div>
    );
  }
}

export default CountyRender;
