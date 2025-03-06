import { useEffect, useState } from 'react';

export const useKakaoLoader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    };
  }, []);

  return loaded;
};
