class MapBoxAPI {
  constructor({ type, query, features = [] }) {
    this.type = type;
    this.query = query;
    this.features = features.map(f => {
      if (String(f.id).startsWith("place")) {
        return new MapBoxPlace(f);
      }
      return new MapBoxPointOfInterest(f);
    });
  }

  static getCoordinates = async location => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    );

    const data = await response.json();
    return new MapBoxAPI(data);
  };
}

class MapBoxPlace {
  constructor({ id, text, place_name, properties, bbox, center, geometry }) {
    this.id = id;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.bbox = bbox;
    this.center = center;
    this.geometry = geometry;
  }
}

class MapBoxPointOfInterest {
  constructor({ id, text, place_name, properties, center, geometry }) {
    this.id = id;
    this.text = text;
    this.place_name = place_name;
    this.properties = properties;
    this.center = center;
    this.geometry = geometry;
  }
}

export default MapBoxAPI;
