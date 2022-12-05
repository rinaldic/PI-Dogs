import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { Provider } from 'react-redux';
import {store} from './/redux/store/index.js';

configure({ adapter: new Adapter() });

describe('<LandingPage />', () => {

    describe('Estructura', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<Provider store = {store}><BrowserRouter><Route><LandingPage/></Route></BrowserRouter></Provider>);
        })
        it('Renderiza un <p>', () => {
            const para = `<p>Know more about your dog and behaviors, be a better partner for him ;)</p>`
            expect(wrapper.html().includes(para)).toBe(true)
        })
        it('No Renderiza un <img>', () => {
          const image = `<img src={dogsgroup} alt="dogsgroup" />`
          expect(wrapper.html().includes(image)).toBe(false);
        })
        })})