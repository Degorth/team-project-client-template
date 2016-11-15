import React from 'react';
import {Link} from 'react-router';
import DataTable from 'react-data-table';
import {getUpcomingEvents} from './../server.js';


export default class Upcoming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: []
        };
    }
//adding datatable columns

	var columns = [
	    {
	        name: 'name',
	        label: 'Name',
	        sorting: true
	    },
	    {
	        name: 'group',
	        label: 'Organizer',
	        sorting: true
	    }
	];
}

React.render(<DataTable url="/products"
	options={options}
	columns={columns}>
	</DataTable>,
	document.getElementById('table')
);
