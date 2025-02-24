
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import Layout from './layouts/Layout';
import AdPanel from './layouts/AdPanel';
import NoMatch from './layouts/NoMatch';
import NewAd from './layouts/NewAd';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#9fa8da',
    },
  },
});

function App() {
 
  return (
    <ThemeProvider theme={theme}>
      {/* Routing */}
      <HashRouter basename="/ct-bierc">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainLayout />} />
            <Route path="login" element={<LoginLayout />} />
            <Route path="panel">
              <Route index element={<AdPanel />} />
              <Route path="add" element={<NewAd/>} />
            </Route>
            <Route path="*" element={<NoMatch/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
