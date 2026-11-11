import React from 'react';
import {
  AbsoluteFill, Composition, interpolate, registerRoot, spring,
  useCurrentFrame, useVideoConfig,
} from 'remotion';

function StudioCard({eyebrow, title}) {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const rise = spring({frame, fps, config: {damping: 18}});
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 100]);
  return (
    <AbsoluteFill style={{background: '#10131b', color: '#f1eee5', fontFamily: 'sans-serif', padding: 48, justifyContent: 'space-between'}}>
      <div style={{letterSpacing: 5, color: '#b9a8ff', fontSize: 14, fontWeight: 700}}>{eyebrow}</div>
      <div style={{transform: `translateY(${(1 - rise) * 40}px)`, opacity: Math.min(1, rise), fontSize: 70, fontWeight: 800, lineHeight: 1.04}}>
        {title}
        <div style={{color: '#b9a8ff', fontSize: 24, marginTop: 16}}>01 / РЕДАКТИРУЕМЫЙ ШАБЛОН</div>
      </div>
      <div style={{height: 4, background: '#333b4e'}}>
        <div style={{height: '100%', width: `${progress}%`, background: '#b9a8ff'}} />
      </div>
    </AbsoluteFill>
  );
}

registerRoot(() => (
  <Composition
    id="StudioCard"
    component={StudioCard}
    width={640}
    height={360}
    fps={24}
    durationInFrames={72}
    defaultProps={{eyebrow: 'REELARIS', title: 'Собираем историю'}}
  />
));
