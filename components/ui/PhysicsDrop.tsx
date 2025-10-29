'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as p2 from 'p2-es';
import {
  IconBrandReact,
  IconBrandVue,
  IconBrandAngular,
  IconBrandTypescript,
  IconBrandCss3,
  IconBrandHtml5,
  IconBrandGraphql,
  IconBrandNodejs,
  IconBrandNextjs,
  IconBrandNuxt,
  IconRefresh,
  IconBrandTailwind,
  IconBrandNpm,
  IconBrandRedux,
  IconBrandJavascript,
} from '@tabler/icons-react';

const ICONS = [
  <IconBrandReact key="react" size={32} color="#61dafb" />, // React 蓝
  <IconBrandVue key="vue" size={32} color="#42b883" />, // Vue 绿
  <IconBrandAngular key="angular" size={32} color="#dd0031" />, // Angular 红
  <IconBrandTypescript key="typescript" size={32} color="#3178c6" />, // TS 蓝
  <IconBrandCss3 key="css3" color="#264de4" size={32} />, // CSS3 蓝
  <IconBrandHtml5 key="html5" color="#e44d26" size={32} />, // HTML5 橙
  <IconBrandGraphql key="graphql" color="#e535ab" size={32} />, // GraphQL 粉
  <IconBrandNodejs key="nodejs" color="#3c873a" size={32} />, // NodeJS 绿
  <IconBrandNextjs key="nextjs" color="#000000" size={32} />, // NextJS 黑
  <IconBrandNuxt key="nuxtjs" color="#00c58e" size={32} />, // Nuxt 绿
  <IconBrandTailwind key="tailwind" color="#38bdf8" size={32} />, // Tailwind 蓝
  <IconBrandNpm key="npm" color="#cb3837" size={32} />, // NPM 红
  <IconBrandRedux key="redux" color="#764abc" size={32} />, // Redux 紫
  <IconBrandJavascript key="javascript" color="#f7df1e" size={32} />, // JavaScript 黄
];

const scale = 100;
const pinRadius = 8 / scale;
const iconRadius = 25 / scale;
const worldWidth = 2.78;
const worldHeight = 5.9;
const iconSize = 50;

const pinGrid = [
  [
    [70, 40],
    [140, 40],
    [210, 40],
  ],
  [
    [105, 112],
    [175, 112],
  ],
  [
    [70, 192],
    [140, 192],
    [210, 192],
  ],
  [
    [105, 288],
    [175, 288],
  ],
  [
    [70, 384],
    [140, 384],
    [210, 384],
  ],
];

interface BodyWithIcon extends p2.Body {
  icon: React.ReactNode;
}

const PhysicsDrop: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const [bodies, setBodies] = useState<BodyWithIcon[]>([]);
  const worldRef = useRef<p2.World | null>(null);
  const bodiesRef = useRef<BodyWithIcon[]>([]);
  const animationRef = useRef<number>();
  const droppingRef = useRef(false);

  // 洗牌
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  useEffect(() => {
    const world = new p2.World({ gravity: [0, -9.82] });
    worldRef.current = world;
    bodiesRef.current = [];
    setBodies([]);
    droppingRef.current = true;

    // 固钉
    pinGrid.forEach(row => {
      row.forEach(([x, y]) => {
        const left = x / scale;
        const top = -y / scale;
        const peg = new p2.Body({
          mass: 0,
          position: [left - pinRadius / 2, top + pinRadius / 2],
        });
        peg.addShape(new p2.Circle({ radius: pinRadius }));
        world.addBody(peg);
      });
    });

    // 边界
    const bottomPlane = new p2.Body({ mass: 0, position: [0, -worldHeight] });
    bottomPlane.addShape(new p2.Plane());
    world.addBody(bottomPlane);
    const leftPlane = new p2.Body();
    leftPlane.addShape(new p2.Plane(), [0, 0], -Math.PI / 2);
    world.addBody(leftPlane);
    const rightPlane = new p2.Body({ position: [worldWidth, 0] });
    rightPlane.addShape(new p2.Plane(), [0, 0], Math.PI / 2);
    world.addBody(rightPlane);

    // 依次掉落粒子
    let cancelled = false;
    async function dropIconsSequentially() {
      const shuffledIcons = shuffle(ICONS);
      for (let i = 0; i < shuffledIcons.length; i++) {
        if (cancelled) break;
        const icon = shuffledIcons[i];
        const x = (Math.floor(Math.random() * 3) + 1) * (worldWidth / 4);
        const body = new p2.Body({
          mass: 1,
          position: [x, iconRadius],
          angularVelocity: Math.random() - 0.5,
          allowSleep: true,
          sleepSpeedLimit: 0.05,
          sleepTimeLimit: 0.3,
          damping: 0.8,
          angularDamping: 0.95,
        }) as BodyWithIcon;
        body.addShape(new p2.Circle({ radius: iconRadius }));
        body.icon = icon;
        world.addBody(body);
        bodiesRef.current.push(body);
        setBodies([...bodiesRef.current]);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      // 只有全部粒子都已添加后才设为 false
      droppingRef.current = false;
    }
    dropIconsSequentially();

    // 动画循环
    let lastTime: number | undefined;
    function animate(time?: number) {
      if (!worldRef.current) return;
      if (lastTime === undefined && time !== undefined) lastTime = time;
      const dt =
        time !== undefined && lastTime !== undefined
          ? Math.min((time - lastTime) / 1000, 0.05)
          : 1 / 60;
      world.step(1 / 60, dt, 5);
      setBodies([...bodiesRef.current]);
      lastTime = time;
      const allSleep =
        bodiesRef.current.length === ICONS.length &&
        bodiesRef.current.every(b => b.sleepState === p2.Body.SLEEPING);
      if (!allSleep || droppingRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      world.clear();
    };
  }, [resetKey]);

  function toPx(x: number, y: number) {
    return {
      left: x * scale,
      top: -y * scale,
    };
  }

  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      {/* Fixed size container - no scrolling */}
      <div className="relative flex-shrink-0" style={{ width: '278px', height: '590px' }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: 'var(--color-background-secondary)',
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(244, 114, 182, 0.08) 0%, transparent 50%)
            `,
          }}
        >
          {/* Refresh button positioned at top right of canvas */}
          <button
            onClick={() => {
              setResetKey(prev => prev + 1);
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group border"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border)',
            }}
            aria-label="重置技术栈演示"
            title="重置"
          >
            <IconRefresh
              className="w-5 h-5 transition-all duration-500 group-hover:rotate-180"
              style={{ color: 'var(--color-text-muted)' }}
            />
          </button>
          {/* 固钉可视化 */}
          {pinGrid.map((row, rowIdx) =>
            row.map(([x, y], colIdx) => (
              <div
                key={`peg-${rowIdx}-${colIdx}-${resetKey}`}
                className="rounded-full"
                style={{
                  position: 'absolute',
                  width: pinRadius * 2 * scale,
                  height: pinRadius * 2 * scale,
                  left: x - pinRadius * scale,
                  top: y - pinRadius * scale,
                  background: 'var(--color-border)',
                  zIndex: 1,
                }}
              />
            ))
          )}
          {/* 粒子（icon） */}
          {bodies.map(body => {
            const { left, top } = toPx(
              body.position[0] - iconRadius,
              body.position[1] + iconRadius
            );
            return (
              <div
                key={body.id}
                className="rounded-full"
                style={{
                  position: 'absolute',
                  width: iconSize,
                  height: iconSize,
                  left,
                  top,
                  transform: `rotate(${body.angle}rad)`,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-card-bg)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {body.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhysicsDrop;
