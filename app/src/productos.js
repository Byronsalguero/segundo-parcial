import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponible, setDisponible] = useState(true);
    const [editarId, setEditarId] = useState(null);

    const fetchProductos = async () => {
        const response = await axios.get('/api/productos');
        setProductos(response.data);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const agregarProducto = async () => {
        const nuevoProducto = { nombre, descripcion, precio: parseFloat(precio), disponible };
        await axios.post('/api/productos', nuevoProducto);
        fetchProductos();
        limpiarCampos();
    };

    const editarProducto = async () => {
        const productoEditado = { nombre, descripcion, precio: parseFloat(precio), disponible };
        await axios.put(`/api/productos/${editarId}`, productoEditado);
        fetchProductos();
        limpiarCampos();
    };

    const eliminarProducto = async (id) => {
        await axios.delete(`/api/productos/${id}`);
        fetchProductos();
    };

    const limpiarCampos = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setDisponible(true);
        setEditarId(null);
    };

    const iniciarEdicion = (producto) => {
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio);
        setDisponible(producto.disponible);
        setEditarId(producto.id);
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
            <label>
                Disponible
                <input type="checkbox" checked={disponible} onChange={() => setDisponible(!disponible)} />
            </label>
            <button onClick={editarId ? editarProducto : agregarProducto}>
                {editarId ? 'Editar Producto' : 'Agregar Producto'}
            </button>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.descripcion} - ${producto.precio} - {producto.disponible ? 'Disponible' : 'No Disponible'}
                        <button onClick={() => iniciarEdicion(producto)}>Editar</button>
                        <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;
