import Provider from '@/app/provider';
import AppRoutes from './router';

function App() {
    return (
        <>
            <Provider>
                <AppRoutes />
            </Provider>
        </>
    );
}

export default App;
