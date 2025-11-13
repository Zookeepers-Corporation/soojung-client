"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    naver: {
      maps: {
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number }
        Map: new (element: HTMLElement | string, options: any) => any
        Marker: new (options: any) => any
        InfoWindow: new (options: any) => any
        Event: {
          addListener: (target: any, event: string, handler: () => void) => void
        }
        Position: {
          TOP_RIGHT: string
        }
      }
    }
  }
}

export default function FooterMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLOUD_CLIENT_ID

    if (!clientId) {
      console.error("NEXT_PUBLIC_NAVER_CLOUD_CLIENT_ID가 설정되지 않았습니다.")
      return
    }

    // 네이버 지도 API 스크립트가 이미 로드되어 있는지 확인
    if (window.naver && window.naver.maps && mapRef.current) {
      initializeMap()
      return
    }

    // 스크립트가 로드되어 있지 않으면 동적으로 로드
    const script = document.createElement("script")
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.async = true
    script.onload = () => {
      if (window.naver && window.naver.maps && mapRef.current) {
        initializeMap()
      }
    }
    document.head.appendChild(script)

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거 (선택사항)
      const existingScript = document.querySelector(
        `script[src*="oapi.map.naver.com"]`
      )
      if (existingScript) {
        // 다른 컴포넌트에서 사용할 수 있으므로 제거하지 않음
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current || !window.naver?.maps) return

    const { maps } = window.naver

    const mapOptions = {
      center: new maps.LatLng(36.059449, 129.373914),
      zoom: 17,
      zoomControl: false,
      zoomControlOptions: {
        position: maps.Position.TOP_RIGHT,
      },
    }

    const map = new maps.Map(mapRef.current, mapOptions)

    // 마커 추가
    const marker = new maps.Marker({
      position: new maps.LatLng(36.059449, 129.373914),
      map: map,
    })

    mapInstanceRef.current = map
  }

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
}
