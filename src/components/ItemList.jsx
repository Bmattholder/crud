import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { getItems, deleteItem } from '../api' 

function ItemList() {
	const [items, setItems] = useState([])

	useEffect(() => {
		fetchItems()
	}, [])

	const fetchItems = async () => {
		try {
			const response = await getItems()
			setItems(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (itemId) => {
		try {
			await deleteItem(itemId)
			setItems(items.filter((item) => item.id !== itemId))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h1>Items</h1>
			<Link to='/items/new'>
				<Button variant='primary'>Add New Item</Button>
			</Link>
			<Table striped border hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>
								<Link to={`/items/${item.id}`}>
									<Button variant='info'>View</Button>
								</Link>
								<Link to={`/items/${item.id}/edit`}>
									<Button variant='warning'>Edit</Button>
								</Link>
								<Button variant='danger' onClick={() => handleDelete(item.id)}>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default ItemList