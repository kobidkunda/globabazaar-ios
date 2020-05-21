import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const ClassLoader = () => (
  <ContentLoader
    speed={7}
    width={350}
    height={200}
    viewBox="0 0 350 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="10" y="21" rx="4" ry="4" width="150" height="10" />
    <Rect x="10" y="41" rx="3" ry="3" width="200" height="7" />
    <Rect x="66" y="-46" rx="3" ry="3" width="139" height="6" />
    <Rect x="88" y="-45" rx="3" ry="3" width="177" height="6" />
    <Rect x="90" y="-45" rx="3" ry="3" width="201" height="6" />
    <Rect x="10" y="61" rx="4" ry="4" width="80" height="6" />
    <Rect x="100" y="61" rx="4" ry="4" width="120" height="6" />
    <Circle cx="300" cy="48" r="26" />
  </ContentLoader>
);

export default ClassLoader;
