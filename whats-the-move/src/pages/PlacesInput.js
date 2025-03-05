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
            <div className="">
                <input 
                    type="text" 
                    value={input} 
                    onChange={handleInput}
                    className="bg-gray-100 rounded w-full py-2 px-3 text-gray-700 focus:outline-none" 
                    placeholder="Location"
                    onClick={() => onSelect(index)}
                />
                <button 
                    onClick={() => onRemove(index)} 
                    className={`ml-2 px-3 py-2 rounded transition ${
                        index === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    disabled={index === 0} // Prevent removing last input
                >
                    ❌
                </button>
            </div>
            {isSelected && predictions.length > 0 && (
                <div className="bg-white shadow-md rounded-md absolute w-full">
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