
import  HeroSection  from '@/components/homeComponents/HeroSection';
import  HomeCategoryBox  from '@/components/homeComponents/HomeCategoryBox';
import  NewArrivals  from '@/components/homeComponents/NewArrivals';
import  PopularThisWeek  from '@/components/homeComponents/PopularThisWeek';
import  SmallNotice  from '@/components/homeComponents/SmallNotice';
import  FollowOnInsta  from '@/components/homeComponents/FollowOnInsta';

// function LazyComponent({ component: Component }) {
//   const { ref, inView } = useInView({
//     triggerOnce: true, // Only trigger once
//     threshold: 0.1, // Trigger when 10% of the component is visible
//   });

//   return (
//     <div ref={ref}>
//       {inView && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <Component />
//         </Suspense>
//       )}
//     </div>
//   );
// }

export function Home() {

  console.log("Ia m inside home page");
  
  return (
    <div className="items-center justify-center">
      {/* <Suspense fallback={<div>Loading Hero Section...</div>}> */}
      <HeroSection />

      <HomeCategoryBox/>

      <NewArrivals/>

      <PopularThisWeek/>

      <SmallNotice/>
      <FollowOnInsta/>

    </div>
  );
}

