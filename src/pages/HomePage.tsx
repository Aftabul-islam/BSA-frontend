import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/About';
import { Events } from '../components/Events';
import { Gallery } from '../components/Gallery';

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <Events />
      <Gallery />
    </div>
  );
};