import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const CircleLoader = () => (
  <ContentLoader
    speed={5}
    width={350}
    height={200}
    viewBox="0 0 350 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Circle cx="44" cy="42" r="38" />
  </ContentLoader>
);

export default CircleLoader;
