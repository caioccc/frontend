import api from "@/services/api"
import { useEffect, useState } from "react"



const WheatherBadge = () => {

  const [temperature, setTemperature] = useState(null)
  const [source_photo, setSourcePhoto] = useState(null)


  useEffect(() => {
    api.get('/api/weather/').then(response => {
      console.log(response.data)
      if (response.data.success === false) {
        console.log('error', 'Nao foi possivel buscar a previsao do tempo')
      } else {
        setTemperature(response.data.temperature)
        setSourcePhoto(response.data.source_photo)
      }
    }).catch(error => {
      console.log('error', 'Nao foi possivel buscar a previsao do tempo', error)
    })
  }, [])

  return (
    <div className="flex flex-row gap-4">
      {
        !temperature ?
          (
            <></>
          )
          :
          (
            <div className="flex flex-row items-center justify-center gap-1">
              <p className="text-sm font-bold">{temperature}°</p>
              <img src={`${source_photo}`} height={'20px'} width={'20px'} />
            </div>
          )
      }
    </div >
  )
}

export default WheatherBadge