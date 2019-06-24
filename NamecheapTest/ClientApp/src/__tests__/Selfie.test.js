import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Selfie from "../components/Selfie/Selfie";

configure({ adapter: new Adapter() });

describe('<Selfie />', () => {
    it('should render error message if user is not set', () => {
        let props = {
            users: {}
        };
        let wrapper = shallow(<Selfie {...props} />);
        expect(wrapper.contains(<div className="ErrorMessage">No user stored</div>)).toEqual(true);
    });

    it('should render user name is not set', () => {
        let props = {
            user: {
                name: "",
                email: "",
                selfie: "",
                automaticCaptures: [""]
            }
        };
        let wrapper = shallow(<Selfie {...props} />);
        expect(wrapper.find('span').at(0).text()).toEqual("Name is not set");
    });

    it('should render user email is not set', () => {
        let props = {
            user: {
                email: ""
            }
        };
        let wrapper = shallow(<Selfie {...props} />);
        expect(wrapper.find('span').at(1).text()).toEqual("Email is not set");
    });

    it('should render user selfie is not captured', () => {
        let props = {
            user: {
                selfie: ""
            }
        };
        let wrapper = shallow(<Selfie {...props} />);
        expect(wrapper.find('span.selfie').text()).toEqual("Selfie is not captured");
    });

    it('should render user automatic captures were not captured', () => {
        let props = {
            user: {
                automaticCaptures: []
            }
        };
        let wrapper = shallow(<Selfie {...props} />);
        expect(wrapper.find('span.automatic-captures').text()).toEqual("No automatic captures were retrieved");
    });
});