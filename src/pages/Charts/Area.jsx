import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, SplineAreaSeries, Legend } from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '../../components';
import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const Area = () => {
  const {isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    if(currentLoginStatus){
      setIsLoggedIn(isLoggedIn);
    }

  }, []);
  return (


<div className={currentMode === 'Dark' ? 'dark' : ''}>
<div className="flex relative dark:bg-main-dark-bg">
  <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
    <TooltipComponent
      content="Settings"
      position="Top"
    >
      <button
        type="button"
        onClick={() => setThemeSettings(true)}
        style={{ background: currentColor, borderRadius: '50%' }}
        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
      >
        <FiSettings />
      </button>

    </TooltipComponent>
  </div>
  {activeMenu ? (
    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
      <Sidebar />
    </div>
  ) : (
    <div className="w-0 dark:bg-secondary-dark-bg">
      <Sidebar />
    </div>
  )}
  <div
    className={
      activeMenu
        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
    }
  >
    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
      <Navbar />
    </div>
    <div>
      {themeSettings && (<ThemeSettings />)}



      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>

    </div>
    <Footer />
  </div>
</div>
</div>
  );
};

export default Area;
