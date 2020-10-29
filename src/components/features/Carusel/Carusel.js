// import React, { useState } from 'react';
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption,
// } from 'reactstrap';
// import { readCars } from '../../../redux/carRedux';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const Carusel = ( {cars} ) => {
//   console.log(cars);
//   let carsArray = [];
//   if (cars.length > 1) {
//     for (let i = 0; i < cars.length; i++) {
//       carsArray.push(cars[i]);
//     }
//   }
//   const items = [
//     {
//       src: carsArray[1] ? carsArray[2].img : null,
//       altText: 'Slide 1',
//       caption: 'Slide 1',
//     },
//     {
//       src: carsArray[2] ? carsArray[1].img : null,
//       altText: 'Slide 2',
//       caption: 'Slide 2',
//     },
//     {
//       src: carsArray[0] ? carsArray[0].img : null,
//       caption: 'Slide 3',
//     },
//   ];



//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   const next = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
//     setActiveIndex(nextIndex);
//   };

//   const previous = () => {
//     if (animating) return;
//     const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//     setActiveIndex(nextIndex);
//   };

//   const goToIndex = (newIndex) => {
//     if (animating) return;
//     setActiveIndex(newIndex);
//   };

//   const slides = items.map((item) => {
//     return (
//       <CarouselItem
//         onExiting={() => setAnimating(true)}
//         onExited={() => setAnimating(false)}
//         key={item.src}
//       >
//         <img src={item.src} alt={item.altText} />
//         <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
//       </CarouselItem>
//     );
//   });

//   return (
//     <Carousel
//       activeIndex={activeIndex}
//       next={next}
//       previous={previous}
//     >
//       <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
//       {slides}
//       <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
//       <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
//     </Carousel>
//   );
// };

// Carusel.propTypes = {
//   cars: PropTypes.array,
 
// };

// const mapStateToProps = state => ({
//   cars: readCars(state),
// });

// export default connect(mapStateToProps)(Carusel);


