/* eslint-disable no-undef */

import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [visible, setVisible] = useState([]);

	useEffect(() => {
		fetchData();
		fetchVisible();
	}, []);

	const fetchData = () => {
		fetch('http://localhost:5000/all-categories')
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			})
			.catch((err) => console.log(err));
	};

	const fetchVisible = () => {
		fetch('http://localhost:5000/visible-categories')
			.then((response) => response.json())
			.then((data) => {
				setVisible(data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<input onChange={(e) => setSearch(e.target.value)} />
			<header className="App-header">
				{categories
					.filter((elem) => {
						return visible.some((filtered) => {
							return filtered.id === elem.id;
						});
					})
					.filter((category) => {
						if (category.group) {
							return category.group.name
								.toLowerCase()
								.includes(search.toLowerCase());
						}
						return null;
					})
					.map((category) => {
						if (category.group) {
							return (
								<div key={category.wording}>
									<p>{category.wording}</p>
									<p>{category.group.name}</p>
									<p>{category.description}</p>
								</div>
							);
						}
						return null;
					})}
			</header>
		</div>
	);
}

export default App;
