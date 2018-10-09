// import React from 'react';
// import Dialog from '@material-ui/core';//'react-toolbox/lib/dialog';
// // import {Tab, Tabs} from 'react-toolbox';
// // import Input from 'react-toolbox/lib/input';
// // import Dropdown from 'react-toolbox/lib/dropdown';

// import {Tabs, Tab, DropdownButton, MenuItem} from 'react-bootstrap'


// class GeneralSettings extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {title: null, datasource: null};
//     }

//     actions = [
//         { label: "Cancel", onClick: this.handleToggle },
//         { label: "Save", onClick: this.handleToggle }
//     ];

//     datasources = [
//         { value: 'url', label: 'Plain URL' },
//         { value: 'python', label: 'Python'}
//     ];

//     handleTabChange = (tabIndex) => {
//         this.setState({tabIndex});
//     };

//     handleInputChange = (name, value) => {
//         this.setState({[name]: value});
//     };

//     render() {
//         return (
//             <Tabs defaultActiveKey={2}>
//                 <Tab eventKey={1} title="General">
//                     <DropdownButton
//                         >
//                         <MenuItem eventKey="1" active>Plain URL</MenuItem>
//                         <MenuItem eventKey="2">Python</MenuItem>
//                     </DropdownButton>
//                 </Tab>
//             </Tabs>
//         );
//     }
// }

// export {GeneralSettings};