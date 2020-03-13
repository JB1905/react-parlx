import React, { useEffect, useRef } from 'react';
import Parlx from 'parlx.js';
import { Settings, Callbacks } from 'parlx.js/lib/types';

type Props = {
  readonly settings: Settings;
  readonly callbacks: Callbacks;
  readonly parlxMove: (e: CustomEvent) => void;
  readonly className: string;
  readonly overlay: boolean;
};

const ReactParlx: React.FC<Props &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >> = ({
  settings,
  callbacks,
  parlxMove,
  className = 'parallax',
  overlay,
  children,
  ...props
}) => {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = el.current;

    Parlx.init({ elements: current, settings, callbacks });

    const output: EventListener = (e: CustomEvent) => parlxMove(e.detail.move);

    if (parlxMove) current.addEventListener('parlxMove', output);

    return () => current!.parlx.destroy();
  }, [settings, callbacks, parlxMove]);

  return (
    <div {...props} ref={el} className={className}>
      {overlay && <div className="overlay" />}
      {children}
    </div>
  );
};

export default ReactParlx;
