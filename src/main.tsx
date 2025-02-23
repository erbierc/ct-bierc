import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { render } from 'react-dom';

const container = document.getElementById('root');
render(<StrictMode><App /></StrictMode>, container);
