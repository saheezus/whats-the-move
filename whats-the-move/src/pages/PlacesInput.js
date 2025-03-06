import React, { useEffect, useRef, useState } from 'react';

const PlacesInput = ({ index, value, onChange, onRemove, isSelected, onSelect }) => {
    const [input, setInput] = useState("");
    const [predictions, setPredictions] = useState([]);
    const autocomplete = useRef(null);

    useEffect(() => {
        autocomplete.current = new window.google.maps.places.AutocompleteService();
    }, []);

    const handleInput = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value) {
            autocomplete.current.getPlacePredictions({ input: value }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setPredictions(results);
                } else {
                    setPredictions([]);
                }
            });
        } else {
            setPredictions([]);
        }
    }

    return (
        <div className="relative w-full">
            <div className="relative w-full py-2">
                <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    className="bg-gray-100 rounded w-full py-2 px-3 pr-10 text-gray-700 focus:outline-none"
                    placeholder="Location"
                    onClick={() => onSelect(index)}
                />
                {index !== 0 && (
                    <button
                        onClick={() => onRemove(index)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                    >
                    ❌
                    </button>
                )}
            </div>
            {isSelected && predictions.length > 0 && (
                <div className="bg-white shadow-md rounded-md absolute w-full z-10">
                    <ul>
                        {predictions.map((prediction) => (
                            <li key={prediction.id} className="p-2 hover:bg-gray-100 text-sm w-full">
                                {prediction.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

}
export default PlacesInput;