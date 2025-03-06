'use client';

import { useEffect, useRef } from 'react';

export const KakaoMap = () => {
  const kakaoRef = useRef<typeof window.kakao | null>(null);

  useEffect(() => {
    const scriptId = 'kakao-map-script';

    const loadKakaoMap = () => {
      if (!window.kakao) return;
      kakaoRef.current = window.kakao;

      const { maps } = kakaoRef.current;

      const container = document.getElementById('map');
      if (!container) return;

      const centerPosition = new maps.LatLng(37.5665, 126.978);

      const map = new maps.Map(container, {
        center: centerPosition,
        level: 3,
      });

      addMarker(map, centerPosition);
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(loadKakaoMap);
      };
    } else {
      window.kakao.maps.load(loadKakaoMap);
    }
  }, []);

  function addMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
    if (!kakaoRef.current) return;
    const { maps } = kakaoRef.current;

    const marker = new maps.Marker({
      position,
    });
    marker.setMap(map);
  }

  return (
    <div
      id='map'
      style={{
        width: '100%',
        height: '50vh',
      }}
    />
  );
};
