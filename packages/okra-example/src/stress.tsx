import { useState, useEffect } from "okra";
import { FPS } from "./fps";
import "./style.css";

const COUNT = 200;
const LOOPS = COUNT * 0.05;

const initialState = { tick: 0, pos: { x: 0, y: 0 }, big: false };

export default () => {
  const [state, setState] = useState(initialState);
  const { tick, pos, big } = state;

  // Infinite animation loop
  useEffect(() => {
    const a = setTimeout(() => setState((s) => ({ ...s, tick: s.tick + 1 })));
    return () => clearTimeout(a);
  }, [tick]); // setState is not stable

  useEffect(() => {
    const move = (e) => setState((s) => ({ ...s, pos: { x: e.pageX, y: e.pageY } }));
    const grow = (e) => setState((s) => ({ ...s, big: true }));
    const shrink = () => setState((s) => ({ ...s, big: false }));

    addEventListener("pointermove", move);
    addEventListener("pointerdown", grow);
    addEventListener("pointerup", shrink);

    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", grow);
      removeEventListener("pointerup", shrink);
    };
  }, []);

  const max = COUNT + Math.round(Math.sin((tick / 90) * 2 * Math.PI) * COUNT * 0.5);

  return (
    <div class="container">
      <FPS />
      <Cursor label x={pos.x} y={pos.y} big={big} />
      {Array.from({ length: max }, (_, i) => {
        const f = (i / max) * LOOPS;
        const θ = f * 2 * Math.PI;
        const m = 20 + i * 2;
        const hue = (f * 255 + tick * 10) % 255;
        return (
          <Cursor
            big={big}
            color={"hsl(" + hue + ",100%,50%)"}
            x={(pos.x + Math.sin(θ) * m) | 0}
            y={(pos.y + Math.cos(θ) * m) | 0}
          />
        );
      })}
    </div>
  );
};

const Cursor = (props) => {
  const { x, y, color, big } = props;
  const w = big ? 20 : 8;

  return (
    <span
      style={`left: ${x}px; top: ${y}px; width: ${w}px; height: ${w}px; border-color: ${color}`}
      fill="transparent"
    />
  );
};
