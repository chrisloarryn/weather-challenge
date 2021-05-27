import { Request, Response } from 'express'

import config from '../config/config'
import Weather, { WeatherDocument } from '../models/weather'

import { eachWord as sentenceToPascalCase } from './../utils'

import Axios from './../utils/api'

export const getWeather = async (req: Request, res: Response) => {
  const { q } = req.body
  const url = `/data/2.5/weather?q=${q}&units=metric&APPID=${config.API_KEY}`
  const mongoQueryParameter = q.includes(',') ? q.split(',')[0] : q
  const savedWeather = await Weather.findOne({
    name: sentenceToPascalCase(mongoQueryParameter)
  }).select('-__v -updatedAt')
  if (savedWeather) {
    return res.status(200).json({
      status: 200,
      data: savedWeather.toObject(),
      statusText: 'OK'
    })
  }
  try {
    const { data } = await Axios.get(url)
    const newWeather: WeatherDocument = data
    await Weather.create(newWeather)
    return res.status(200).json({
      status: 200,
      data,
      statusText: 'OK'
    })
  } catch ({ error, name, message, keyValue }) {
    return res.status(404).json({
      status: 404,
      data: null,
      error: {
        field: keyValue?.name,
        message,
        type: name
      },
      statusText: 'NOOK'
    })
  }
}
