import { useEffect, useRef, useState } from "okra";

export const FPS = ({ width = 100, height = 50, widthBar = 5 }) => {
  const { fps, avgFps, maxFps, currentFps } = useFps(Math.floor(width / 2));

  return (
    <div class="fps">
      <div class="bars" style={`width: ${width}px; height: ${height}px;`}>
        {fps.map((val, i) => (
          <div
            key={i}
            style={`width: ${widthBar}px; right: ${(fps.length - 1 - i) * widthBar}px; height: ${
              (height * val) / maxFps
            }px;`}
          />
        ))}
      </div>
      <small>
        {currentFps} FPS ({avgFps})
      </small>
    </div>
  );
};

const useFps = (windowWidth: number) => {
  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  const animRef = useRef(0);

  const prevFps = useRef([]);
  const [fps, setFps] = useState([]);

  const calcFps = () => {
    const t = performance.now();

    frames.current += 1;

    if (t > prevTime.current + 1000) {
      const elapsed = t - prevTime.current;

      const currentFps = Math.round((frames.current * 1000) / elapsed);
      prevFps.current = prevFps.current.concat(currentFps);

      if (elapsed > 1500) {
        for (let i = 1; i <= (elapsed - 1000) / 1000; i++) {
          prevFps.current = prevFps.current.concat(0);
        }
      }

      prevFps.current = prevFps.current.slice(Math.max(prevFps.current.length - windowWidth, 0));
      setFps(prevFps.current);

      frames.current = 0;
      prevTime.current = performance.now();
    }

    animRef.current = requestAnimationFrame(calcFps);
  };

  useEffect(() => {
    animRef.current = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const avgFps = (fps.reduce((a, b) => a + b, 0) / fps.length).toFixed(2);
  const maxFps = Math.max.apply(Math.max, fps);
  const currentFps = fps[fps.length - 1];

  return { fps, avgFps, maxFps, currentFps };
};
