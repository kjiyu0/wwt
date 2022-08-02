import { ThemeProvider } from 'styled-components';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './utils/style/GlobalStyle';
import 'antd/dist/antd.css';
import theme from './utils/theme';
import MainPage from './pages/MainPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
