import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Restaurant {
    id: string;
    name: string;
}

const RestaurantList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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

    return (
        <div>
            <h1>Restaurant List</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;