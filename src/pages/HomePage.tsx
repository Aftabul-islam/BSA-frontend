import React from 'react';
import { Hero } from '../components/Hero';
import { Events } from '../components/Events';
import { Gallery } from '../components/Gallery';

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Events />
      <Gallery />
    </div>
  );
};