import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

interface Item {
    name: string;
    description: string;
    price: number;
}

interface Restaurant {
    _id: string;
    name: string;
    description: string;
    image: string;
    dishes: Item[];
    drinks: Item[];
}

const RestaurantList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const { searchTerm } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<Restaurant[]>('http://localhost:3000/restaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Failed to fetch restaurants', error);
            }
        };

        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter(restaurant => {
        const searchLower = searchTerm.toLowerCase();
        return (
            restaurant.name.toLowerCase().includes(searchLower) ||
            restaurant.description.toLowerCase().includes(searchLower) ||
            restaurant.dishes.some(dish =>
                dish.name.toLowerCase().includes(searchLower) ||
                dish.description.toLowerCase().includes(searchLower)
            ) ||
            restaurant.drinks.some(drink =>
                drink.name.toLowerCase().includes(searchLower)
            )
        );
    });

    const handleCardClick = (id: string) => {
        navigate(`/restaurants/${id}`);
    };

    return (
        <div className="restaurant-list-page">
            <Header />
            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant._id} className="restaurant-card" onClick={() => handleCardClick(restaurant._id)}>
                        <img src={restaurant.image} alt={restaurant.name} />
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default RestaurantList;