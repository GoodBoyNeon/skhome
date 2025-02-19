import React from 'react'

const Visit = () => {
  return (
    <>
      <iframe
        width="450"
        height="250"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=S.K Home Traders`}
      >
      </iframe></>
  )
}

export default Visit;
