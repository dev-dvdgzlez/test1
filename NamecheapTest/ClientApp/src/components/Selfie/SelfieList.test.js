import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelfieList from "./SelfieList";

configure({ adapter: new Adapter() });

describe('<SelfieList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SelfieList />);
    });

    it('should render error message if user list is not set', () => {
        wrapper.setProps({
            users: null
        });
        expect(wrapper.contains(<div className="ErrorMessage">There are no users stored</div>)).toHaveLength(1);
    });

    it('should render table with users name and email', () => {
        wrapper.setProps({
            users: [
                {
                    name: "John Doe",
                    email: "john.doe@gmail.com"
                }
            ]
        });
        expect(wrapper.find(<td />)).toHaveLength(2);
    });
});