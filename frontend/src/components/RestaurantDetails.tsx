// src/components/RestaurantDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<any>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Failed to fetch restaurant details', error);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <ul>
                {restaurant.dishes.map((dish: string, index: number) => (
                    <li key={index}>{dish}</li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantDetails;