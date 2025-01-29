import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Item {
    name: string;
    description: string;
    price: number;
}

interface Restaurant {
    name: string;
    description: string;
    image: string;
    address: string;
    phone: string;
    dishes: Item[];
    drinks: Item[];
}

const RestaurantDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get<Restaurant>(`http://localhost:3000/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Falha ao pegar os detalhes do restaurante!', error);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-details-page">
            <Header />
            <div className="restaurant-details">
                <h1>{restaurant.name}</h1>
                <img src={restaurant.image} alt={restaurant.name} />
                <p>{restaurant.description}</p>
                <p><strong>Endereço:</strong> {restaurant.address}</p>
                <p><strong>Número:</strong> {restaurant.phone}</p>
                <h2>Pratos</h2>
                <div className="item-list">
                    {restaurant.dishes.map((dish, index) => (
                        <div key={index} className="item-card">
                            <h3>{dish.name}</h3>
                            <p>{dish.description}</p>
                            <p>${dish.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <h2>Bebidas</h2>
                <div className="item-list">
                    {restaurant.drinks.map((drink, index) => (
                        <div key={index} className="item-card">
                            <h3>{drink.name}</h3>
                            <p>${drink.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RestaurantDetails;