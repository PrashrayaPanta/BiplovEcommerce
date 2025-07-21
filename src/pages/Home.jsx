import React, { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazy load components
const HeroSection = lazy(() => import('@/components/homeComponents/HeroSection'));
const HomeCategoryBox = lazy(() => import('@/components/homeComponents/HomeCategoryBox'));
const NewArrivals = lazy(() => import('@/components/homeComponents/NewArrivals'));
const PopularThisWeek = lazy(() => import('@/components/homeComponents/PopularThisWeek'));
const SmallNotice = lazy(() => import('@/components/homeComponents/SmallNotice'));
const FollowOnInsta = lazy(() => import('@/components/homeComponents/FollowOnInsta'));

function LazyComponent({ component: Component }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="items-center justify-center">
      <Suspense fallback={<div>Loading Hero Section...</div>}>
        <HeroSection />
      </Suspense>
      <LazyComponent component={HomeCategoryBox} />
      <LazyComponent component={NewArrivals} />
      <LazyComponent component={PopularThisWeek} />
      <LazyComponent component={SmallNotice} />
      <LazyComponent component={FollowOnInsta} />
    </div>
  );
}

export default Home;
