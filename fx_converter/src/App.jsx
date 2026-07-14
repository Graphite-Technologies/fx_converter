import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LiveTicker from './components/LiveTicker'
import { TICKER_PAIRS } from './data/ticker'
import ConversionPanel from './components/ConversionPanel'
import Tabs from './components/Tabs'
import StatsRow from './components/StatsRow'
import RangeSelector from './components/RangeSelector'
import RateChart from './components/RateChart'
import { useHistoricalRates } from './hooks/useHistoricalRate'
import { useCurrencyConverter } from './hooks/useCurrencyConverter'
import CompareTab from './components/CompareTab'
import { useFavoritePairs } from './hooks/useFavoritePairs'
import FavoriteTab from './components/FavoriteTab'
import { FAVORITE_PAIRS } from './data/favoritePairsData'

const TABS = [
  {id: 'history', label: 'HISTORY'},
  {id: 'compare',  label: 'COMPARE'},
  {id: 'favorites', label: 'FAVORITES', count: 10},
  {id: 'log', label:'LOG', count: 8},
];

export default function App() {
  const [activeTab, setActiveTab] = useState('history');

  const [range, setRange] = useState('1M');
  const [conversionLog, setConversionLog] = useState([]);

  const converter = useCurrencyConverter();

  const {data, stats, isLoading} = useHistoricalRates(range);
  const  favoritePairs = useFavoritePairs();
  
  function handleLogConversion(entry){
    setConversionLog( (log) => [entry, ...log]);
  }

   const tabsWithCounts = TABS.map((tab) => {
    if (tab.id === 'favorites') return { ...tab, count: favoritePairs.pairs.length };
    // if (tab.id === 'log') return { ...tab, count: log.entries.length };
    return tab;
  });

  return (
    <div className="app">
      <div className='app__frame'>
        <header className='app__header'>
          <span className='app__title'>
            <span className='app__title-badge'></span>
            FX_CHECKER
          </span>
          <span className='app__meta'>55 CURRENCIES . EOD . ECB DATA</span>
        </header>
        <LiveTicker pairs={TICKER_PAIRS}/>
        <main className='app__main'>
          <ConversionPanel converter={converter} onLogConversion={handleLogConversion} />
            <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab}/>
            {activeTab === "history" && (
              <section className='history-section' aria-label='Rate history'>
                <div className='history-section__toolbar'>
                  <StatsRow stats={stats}/>
                  <RangeSelector value={range} onChange={setRange}/>
                </div>

                {isLoading ? (
                  <div className='rate-chart rate-chart--empty'>Loading chart...</div>
                ) : (
                  <RateChart data={data} pairLabel="USD/EUR"/>
                )}
              </section>
            )}

            {activeTab === 'compare' && (
              <CompareTab
                baseAmount={converter.sendAmount}
                baseCurrency={converter.sendCurrency}
                excludeCurrency={converter.receiveCurrency}
              />
            )}

            {activeTab === 'favorites' && (
              <FavoriteTab pairs={favoritePairs.pairs} onRemove={favoritePairs.remove}/>
            )}

            {activeTab !== 'history' && activeTab !== 'compare' && activeTab !== 'favorites' && (
               <section className="placeholder-section">
                <p>
                  {TABS.find((t) => t.id === activeTab)?.label} view — not part of this
                  mock, wired the same way `history` is.
                </p>
              </section>
          )}
        </main>
      </div>
    </div>
  )
}

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
