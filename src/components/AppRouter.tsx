import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Character } from '../pages/Character';
import { Characters } from '../pages/Characters';
import { Episode } from '../pages/Episode';
import { Episodes } from '../pages/Episodes';
import { Home } from '../pages/Home';
import { Location } from '../pages/Location';
import { Locations } from '../pages/Locations';
import { Layout } from './Layout';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters />}>
          <Route path=":characterId" element={<Character />} />
        </Route>
        <Route path="locations" element={<Locations />}>
          <Route path=":locationId" element={<Location />} />
        </Route>
        <Route path="episodes" element={<Episodes />}>
          <Route path=":episodeId" element={<Episode />} />
        </Route>
      </Route>
    </Routes>
  );
};
