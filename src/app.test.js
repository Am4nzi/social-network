import React from 'react';
import App from './app';
import {render, waitForElement} from '@testing-library/react';
import axios from './axios';

jest.mock('./axios');

//TEST 1 - APP SHOWS NOTHING AT FIRST
test('App shows nothing at first', async () => {

    axios.get.mockResolvedValue({
        data: {
            id: 420,
            first: 'Funky',
            last: 'Chicken',
            url: '/funkychicken.png'
        }
    });

    const {container} = render(<App />);

    expect(
        container.children.length
    ).toBe(0);

    console.log(container.innerHTML);

    await waitForElement(
        () => container.querySelector('div')
    );

    console.log(
        container.innerHTML
    );

});
