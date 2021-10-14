import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
    return (
        <>
            <Header />
            <main className="col-span-1 col-start-1 p-4 sm:pl-4 sm:col-span-3">
                <Home />
            </main>
            <aside>
                <Subreddits />
            </aside>
        </>
    );
}

export default App;
