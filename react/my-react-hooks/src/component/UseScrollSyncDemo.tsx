import { useEffect, useRef, useState } from 'react';
import { useScrollSync } from '../hooks/useScrollSync';

const data = [
  {
    label: 'tab1',
    sectionHeight: 140,
  },
  {
    label: 'tab2',
    sectionHeight: 120,
  },
  {
    label: 'tab3',
    sectionHeight: 150,
  },
  {
    label: 'tab4',
    sectionHeight: 40,
  },
];
const DefaultLabel = data[2].label;

export function UseScrollSyncDemo() {
  const { listWrapperRef, tabRefs, sectionRefs, scrollToTab, selectedTabId } =
    useScrollSync({
      defaultTabId: DefaultLabel,
    });

  return (
    <div className="card">
      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 16,
          width: '300px',
          height: '400px',
          overflow: 'hidden',
          margin: '0 auto',
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            overflow: 'scroll',
            flexShrink: 0,
          }}
        >
          {data.map((tab) => (
            <div
              key={tab.label}
              style={{
                textAlign: 'center',
                width: 100,
                flexShrink: 0,
                borderRadius: 16,
                background: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: selectedTabId === tab.label ? 'coral' : 'black',
                cursor: 'pointer',
              }}
              ref={(el) => {
                tabRefs.current[tab.label] = el;
              }}
              onClick={() => scrollToTab(tab.label)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div
          ref={listWrapperRef}
          style={{
            padding: 16,
            background: 'black',
            width: '100%',
            borderRadius: 16,
            height: '100%',
            overflow: 'scroll',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {data.map((tab) => (
            <div
              key={tab.label}
              style={{
                height: `${tab.sectionHeight}px`,
                flexShrink: 0,
                background: 'coral',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              ref={(el) => {
                sectionRefs.current[tab.label] = el;
              }}
            >
              {tab.label} section
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
