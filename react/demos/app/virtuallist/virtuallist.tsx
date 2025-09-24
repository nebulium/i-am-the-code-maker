import { useEffect, useRef, useState, type JSX } from 'react';

const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `List #${i}`,
}));

const Row = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => (
  <div
    style={{
      ...style,
      lineHeight: `${style.height}px`,
      paddingLeft: '1rem',
      borderBottom: '1px solid #eee',
    }}
    className="list-item"
  >
    {data[index].text}
  </div>
);

const VirtualList = ({
  height,
  itemCount,
  itemSize,
  renderItem,
}: {
  height: number;
  itemCount: number;
  itemSize: number;
  renderItem: (props: {
    index: number;
    style: React.CSSProperties;
  }) => JSX.Element;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const visibleItems = [];
  const startIndex = Math.max(0, Math.floor(scrollTop / itemSize));
  const endIndex = Math.min(
    itemCount - 1,
    Math.ceil((scrollTop + height) / itemSize)
  );

  // add some buffern
  const buffer = 5;
  const bufferedStartIndex = Math.max(0, startIndex - buffer);
  const bufferedEndIndex = Math.min(itemCount - 1, endIndex + buffer);

  for (let i = bufferedStartIndex; i <= bufferedEndIndex; i++) {
    visibleItems.push(
      renderItem({
        index: i,
        style: {
          position: 'absolute',
          top: i * itemSize,
          left: 0,
          width: '100%',
          height: itemSize,
        },
      })
    );
  }
  return (
    <div
      ref={containerRef}
      className="w-full overflow-auto relative border rounded-lg"
      style={{
        height,
      }}
    >
      <div
        className="w-full relative"
        style={{
          height: itemCount * itemSize, // for scroll bar
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
};

export function VirtualListPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h2>Virual List</h2>
      <div className="max-w-[400px] w-full">
        <VirtualList
          height={400}
          itemCount={data.length}
          itemSize={40}
          renderItem={Row}
        />
      </div>
    </div>
  );
}
