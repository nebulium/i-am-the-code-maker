import { useEffect, useRef, useState } from 'react';

export const useScrollSync = ({ defaultTabId }: { defaultTabId: string }) => {
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutIdRef = useRef<number | null>(null);

  const isProgrammaticScroll = useRef(false);

  const [selectedTabId, setSelectedTabId] = useState(defaultTabId);
  const selectedTabIdRef = useRef(selectedTabId);

  const smoothScrollIntoView = (el?: HTMLElement | null) => {
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  const scrollToTab = (tab: string) => {
    setSelectedTabId(tab);
    isProgrammaticScroll.current = true;
    smoothScrollIntoView(tabRefs.current[tab]);
    smoothScrollIntoView(sectionRefs.current[tab]);
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollToTab(defaultTabId);
  }, [defaultTabId]);

  useEffect(() => {
    selectedTabIdRef.current = selectedTabId;
  }, [selectedTabId]);

  useEffect(() => {
    const wrapper = listWrapperRef.current;
    if (!wrapper) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking || isProgrammaticScroll.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100; // buffer
        if (isAtBottom) {
          ticking = false;
          return;
        }

        const wrapperTop = wrapper.getBoundingClientRect().top;
        let closestId = '';
        let minDistance = Infinity;

        for (const [id, el] of Object.entries(sectionRefs.current)) {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - wrapperTop);
          if (distance < minDistance) {
            closestId = id;
            minDistance = distance;
          }
        }

        if (closestId && closestId !== selectedTabIdRef.current) {
          setSelectedTabId(closestId);
          smoothScrollIntoView(tabRefs.current[closestId]);
        }
        ticking = false;
      });
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    tabRefs,
    sectionRefs,
    listWrapperRef,
    scrollToTab,
    selectedTabId,
  };
};
