import React, {useEffect, useState} from 'react'

import {Loading} from '../../components/Loading'

import {api} from '../../services/api'

import {CarDTO} from '../../dtos/CarDTO'

import {Container} from './styles'

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCars() {
      try {
        const {data} = await api.get<CarDTO[]>(`schedules_byuser?user_id${1}`)

        setCars(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return <Container></Container>
}
