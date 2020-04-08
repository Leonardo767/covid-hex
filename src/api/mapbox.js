import React from "react";
import {
  HomeRounded,
  RoomRounded,
  LocationCityRounded,
  PublicRounded,
  FlagRounded,
  ExploreRounded,
  ApartmentRounded
} from "@material-ui/icons";

class MapBoxAPI {
  constructor({ type, query, features = [] }) {
    this.type = type;
    this.query = query;
    this.features = features.map(f => {
      switch (String(f.id).split(".")[0]) {
        case "poi":
          return new PointOfInterest(f);
        case "country":
          return new Country(f); // todo
        case "region":
          return new Region(f); // todo
        case "postcode":
          return new PostCode(f); // todo
        case "district":
          return new District(f); // todo
        case "locality":
          return new Locality(f); // todo
        case "neighborhood":
          return new Neighborhood(f); // todo
        case "address":
          return new Address(f);
        case "place":
        default:
          return new Place(f);
      }
    });
  }

  static getCoordinates = async location => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&country=US`
    );

    const data = await response.json();
    return new MapBoxAPI(data);
  };
}

export class Point {
  constructor(longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  toArray() {
    return [this.longitude, this.latitude];
  }
}

export class Place {
  /**
   * Typically these are cities, villages, municipalities, etc.
   * They’re usually features used in postal addressing, and are
   * suitable for display in ambient end-user applications where
   * current-location context is needed (for example, in weather displays).
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point[]} param.bbox Array of points that give a box around the center of the place.
   * @param {any} param.geometry
   */
  constructor({ id, text, place_name, properties, bbox, center, geometry }) {
    this.id = id;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.icon = <LocationCityRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class PointOfInterest {
  /**
   * Points of interest.
   * These include restaurants, stores, concert venues, parks, museums, etc.
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   */
  constructor({ id, text, place_name, properties, center, geometry }) {
    this.id = id;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.icon = <RoomRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class Address {
  /**
   * Individual residential or business addresses
   * @param {object} param
   * @param {string} param.id Id.
   * @param {number} param.address Number of the full address. Example: 123 Red Bird Lane would be 123
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   */
  constructor({ id, address, text, place_name, properties, center, geometry }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.icon = <HomeRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class Country {
  /**
   * Generally recognized countries or, in some cases like Hong Kong,
   * an area of quasi-national administrative status that has been given
   * a designated country code under ISO 3166-1
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} param.boundingBox Array of points that give a box around the center of the place.
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <PublicRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class Region {
  /**
   * Top-level sub-national administrative features, such as states in the United States or provinces in Canada or China
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} bbox Bounding Area
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <FlagRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class PostCode {
  /**
   * Postal codes used in country-specific national addressing systems
   * @param {object} param
   * @param {string} param.id Id.
   * @param {number} param.address Number of the full address. Example: 123 Red Bird Lane would be 123
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} bbox Bounding Area
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <ExploreRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class District {
  /**
   * Features that are smaller than top-level administrative features but typically larger than cities,
   * in countries that use such an additional layer in postal addressing (for example, prefectures in China).
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} param.bbox
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <ApartmentRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class Locality {
  /**
   * Official sub-city features present in countries where such an additional
   * administrative layer is used in postal addressing, or where such features
   * are commonly referred to in local parlance. Examples include city districts
   * in Brazil and Chile and arrondissements in France
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} param.bbox
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <RoomRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export class Neighborhood {
  /**
   * Colloquial sub-city features often referred to in local parlance.
   * Unlike locality features, these typically lack official status and
   * may lack universally agreed-upon boundaries.
   * @param {object} param
   * @param {string} param.id Id.
   * @param {string} param.text Easy to read title.
   * @param {string} param.place_name Full title.
   * @param {object} param.properties Includes wiki data.
   * @param {Point} param.center Absolute location.
   * @param {any} param.geometry
   * @param {Point[]} bbox Bounding area
   */
  constructor({
    id,
    address,
    text,
    place_name,
    properties,
    center,
    geometry,
    bbox
  }) {
    this.id = id;
    this.address = address;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = new Point(center[0], center[1]);
    this.geometry = geometry;
    this.boundingBox = [
      new Point(bbox[0], bbox[1]),
      new Point(bbox[2], bbox[3])
    ];
    this.icon = <HomeRounded />;
  }

  get Name() {
    return this.place_name;
  }
}

export default MapBoxAPI;
