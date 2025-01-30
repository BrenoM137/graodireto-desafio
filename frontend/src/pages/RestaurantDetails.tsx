import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Item {
    name: string;
    description: string;
    price: number;
    image?: string;
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

                <div className="restaurant-details-banner">
                    <img src={`http://localhost:3000/${restaurant.image}`} alt={restaurant.name} />
                </div>
                <div className="restaurant-details-info">
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.description}</p>
                    <div className="details">
                        <p><strong>Endereço:</strong> {restaurant.address}</p>
                        <p><strong>Número:</strong> {restaurant.phone}</p>
                    </div>
                </div>
                <h2>Pratos</h2>
                <div className="item-list">
                    {restaurant.dishes.map((dish, index) => (
                        <div key={index} className="item-card">
                            {dish.image && <img src={`http://localhost:3000/${dish.image}`} alt={dish.name} />}
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
                            {drink.image && <img src={`http://localhost:3000/${drink.image}`} alt={drink.name} />}
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