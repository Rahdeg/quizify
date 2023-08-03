"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

const data = [
  {
    text:"hey",
    value:3
  },
  {
    text:"then",
    value:7
  },
  {
    text:"why",
    value:5
  },
  {
    text:"next",
    value:4
  },
  {
    text:"how",
    value:8
  }
]

const fontSizeMapper =(word:{value : number})=>{
  return Math.log2(word.value) * 5 + 16
}

const CustomWordCloud = () => {
  const theme = useTheme();
  return (
   <>
   <D3WordCloud data={data} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme.theme === "dark"?"white" :"black"}/>
   </>
  )
}

export default CustomWordCloud