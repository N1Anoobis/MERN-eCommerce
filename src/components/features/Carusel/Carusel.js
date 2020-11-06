import React, { useState } from 'react';
import {
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
} from 'reactstrap';
import { currentCar } from '../../../redux/carRedux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Carusel.module.scss';
import clsx from 'clsx';
const Carusel = ({ className, car }) => {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  let carsImg = [];

  if (car.img) {
    carsImg = car.img;
  }

  if (car) {
    const items = [
      {
        src: carsImg[0] ? carsImg[2] : '',
        altText: '):',
        caption: 'Quality',
      },
      {
        src: carsImg[0] ? carsImg[1] : ' ',
        altText: '):',
        caption: 'Innovation',
      },
      {
        src: carsImg[0] ? carsImg[0] : null,
        altText: '):',
        caption: 'Future',
      },
    ];

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
      return (
        <CarouselItem className={styles.box}
          style={loaded ? {} : { display: 'none' }}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          onLoad={() => setLoaded(true)}
          key={item.src}
        >
          <img className={clsx(className, styles.item)} src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel className={clsx(className, styles.root)}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
};

Carusel.propTypes = {
  car: PropTypes.object,
};

const mapStateToProps = state => ({
  car: currentCar(state),
});

export default connect(mapStateToProps)(Carusel);


