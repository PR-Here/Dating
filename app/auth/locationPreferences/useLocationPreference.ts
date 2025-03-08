import { useState } from "react";

interface LocationPreferencesProps {
    onNext: () => void;
}

export const useLocationPreference = ({ onNext }: LocationPreferencesProps) => {

    const [city, setCity] = useState('');
    const [distance, setDistance] = useState(25);
    const [lookingFor, setLookingFor] = useState('');

    const handleContinue = () => {
        if (city && lookingFor) {
            onNext();
        }
    };

    const handleValueChange = (low: number) => {
        setDistance(Math.round(low));
    };
    return {
        city,
        distance,
        lookingFor,
        handleContinue,
        handleValueChange,
        setCity,
        setDistance,
        setLookingFor,
    }
}
