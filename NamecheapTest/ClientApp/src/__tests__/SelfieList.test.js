import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelfieList from "../components/Selfie/SelfieList";

configure({ adapter: new Adapter() });

describe('<SelfieList />', () => {
    it('should render error message if user list is not set', () => {
        let props = {
            users: []
        };
        let wrapper = shallow(<SelfieList {...props} />);
        expect(wrapper.contains(<div className="ErrorMessage">There are no users stored</div>)).toEqual(true);
    });

    it('should render table with users name and email', () => {
        let props = {
            users: [
                {
                    name: "John Doe",
                    email: "john.doe@gmail.com"
                }
            ],
            clicked: () => {

            }
        };
        let wrapper = shallow(<SelfieList {...props} />);
        expect(wrapper.find('td')).toHaveLength(2);
        expect(wrapper.find('td').at(0).text()).toEqual("john.doe@gmail.com");
        expect(wrapper.find('td').at(1).text()).toEqual("John Doe");
        props = {
            users: [
                {
                    name: "John Doe",
                    email: "john.doe@gmail.com"
                },
                {
                    name: "John Doe 2",
                    email: "john.doe.2@gmail.com"
                }
            ],
            clicked: () => {

            }
        };

        wrapper = shallow(<SelfieList {...props} />);
        expect(wrapper.find('td')).toHaveLength(4);
        expect(wrapper.find('td').at(0).text()).toEqual("john.doe@gmail.com");
        expect(wrapper.find('td').at(1).text()).toEqual("John Doe");
        expect(wrapper.find('td').at(2).text()).toEqual("john.doe.2@gmail.com");
        expect(wrapper.find('td').at(3).text()).toEqual("John Doe 2");
    });

    it("should throw an error exception on clicked event not defined", () => {
        let props = {
            users: [
                {
                    name: "John Doe",
                    email: "john.doe@gmail.com"
                }
            ]
        };
        expect(() => shallow(<SelfieList {...props} />)).toThrow("'clicked' event not defined");
    });
});