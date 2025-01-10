import { useEffect, useState } from "react"


const IpStackComponent = () => {

  const [ip, setIp] = useState(null)
  const [city, setCity] = useState(null)
  const [country_code, setCountryCode] = useState(null)
  const [country_flag, setCountryFlag] = useState(null)


  useEffect(() => {
    const local_user_data = localStorage.getItem('local_user')
    if (local_user_data && local_user_data !== 'undefined') {
      const local_user = JSON.parse(local_user_data)
      setIp(local_user.ip)
      setCity(local_user.city)
      setCountryCode(local_user.country_code)
      setCountryFlag(local_user.country_flag)
    }
  }, [])

  return (
    <div className="flex flex-row gap-4">
      {
        !ip ?
          (
            <></>
          )
          :
          (
            <div className="flex flex-row items-center justify-center gap-1">
              <img src={`${country_flag}`} height={'20px'} width={'20px'} />
              <p className="text-xs">Seu IP: {ip}</p>
              <p className="text-xs">{city}, {country_code}</p>
            </div>
          )
      }
    </div >
  )
}

export default IpStackComponent