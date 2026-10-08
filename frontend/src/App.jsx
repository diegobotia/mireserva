import { useState } from 'react';

import { ReservationForm } from './components/reservation-form/ReservationForm';
import { ReservationPage } from './components/reservation-page/ReservationPage';

function App() {
  const [listRefreshKey, setListRefreshKey] = useState(0);

  return (
    <>
      <ReservationForm onSuccess={() => setListRefreshKey((key) => key + 1)} />
      <ReservationPage refreshKey={listRefreshKey} />
    </>
  );
}

export default App;
