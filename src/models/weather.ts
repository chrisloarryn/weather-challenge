import { model, Schema, Document, Model } from 'mongoose'

// Schema
const weatherSchema = new Schema<WeatherDocument, WeatherModel>(
  {
    coord: {
      lon: {
        type: Number
      },
      lat: {
        type: Number
      }
    },
    weather: [
      new Schema(
        {
          "id": {
            type: Number
          },
          "main": {
            type: String
          },
          "description": {
            type: String
          },
          "icon": {
            type: String
          },
        },
        {
          _id: false,
          timestamps: false,
          versionKey: false,
        },
      ),
    ],
    base: {
      type: String
    },
    main: {
      temp: {
        type: Number
      },
      feels_like: {
        type: Number
      },
      temp_min: {
        type: Number
      },
      temp_max: {
        type: Number
      },
      pressure: {
        type: Number
      },
      humidity: {
        type: Number
      },
      sea_level: {
        type: Number
      },
      grnd_level: {
        type: Number
      }
    },
    visibility: {
      type: Number
    },
    wind: {
      speed: {
        type: Number
      }, deg: {
        type: Number
      }, gust: {
        type: Number
      },
    },
    clouds: {
      all: {
        type: Number
      },
    },
    dt: {
      type: Number
    },
    sys: {
      type: {
        type: Number
      },
      id: {
        type: Number
      },
      country: {
        type: String
      },
      sunrise: {
        type: Number
      },
      sunset: {
        type: Number
      },
    },
    timezone: {
      type: Number
    },
    id: {
      type: Number
    },
    name: {
      type: String
    },
    cod: {
      type: Number
    },
  },
  { timestamps: true }
)

weatherSchema.index({ id: -1 }); // schema level

export type WeatherDocument = Document // pending to define a interface or type for WeatherDocument Weather (type|interface) & Document

export type WeatherModel = Model<WeatherDocument>

export default model<WeatherDocument, WeatherModel>('Weather', weatherSchema)
