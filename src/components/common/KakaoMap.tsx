'use client';

import { useEffect, useRef } from 'react';
import { useKakaoLoader } from '@/hooks/useKakaoLoader';

export const KakaoMap = () => {
  const kakaoRef = useRef<typeof window.kakao | null>(null);
  const loaded = useKakaoLoader();

  useEffect(() => {
    if (!loaded) return;

    kakaoRef.current = window.kakao;
    const { maps } = kakaoRef.current;

    const container = document.getElementById('map');
    if (!container) return;

    // TODO: 주소 변경
    const centerPosition = new maps.LatLng(37.4927, 126.67294133729);

    const map = new maps.Map(container, {
      center: centerPosition,
      level: 3,
    });

    const marker = new maps.Marker({
      position: centerPosition,
    });
    marker.setMap(map);

    return () => {
      kakaoRef.current = null;
    };
  }, [loaded]);

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
