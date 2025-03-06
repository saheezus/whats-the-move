import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MapComponent from './MapComponent';
import PlacesInput from './PlacesInput';

const Home = () => {

    const [locations, setLocations] = useState([""]);
    const [locIdx, setLocIdx] = useState(null);

    const addLocation = () => {
        setLocations([...locations, ""]);
    }

    const removeLocation = (index) => {
        setLocations(locations.filter((location, i) => i !== index));
    }

    const updateLocation = (index, value) => {
        const newLocations = [...locations];
        newLocations[index] = value;
        setLocations(newLocations);
    };

    return (
        <div className="bg-white flex flex-col p-6">
            <div className="bg-gray-100 grid grid-cols-3 shadow-sm flex p-6 rounded-lg">
                <div className="col-span-2 flex flex-col rounded-lg">
                    <div className="flex flex-col">
                        <MapComponent />
                    </div>
                </div>
                <div className="bg-white flex-col flex rounded-lg shadow-md"> 
                    <div className="p-5 pb-2">
                        <span className="text-xl font-bold">Let's get started</span>
                    </div>
                    <div className="px-4 py-2 w-full">
                        <input 
                            className="bg-gray-100 rounded w-full py-2 px-3 text-gray-700 focus:outline-none"  
                            type="text" 
                            placeholder="Place Category"
                        />
                    </div>
                    <div className="px-4 w-full">
                        {locations.map((location, index) => (
                            <PlacesInput 
                                key={index}
                                index={index}
                                value={location}
                                onChange={(value) => updateLocation(index, value)}
                                onRemove={() => removeLocation(index)}
                                isSelected={locIdx === index}
                                onSelect={setLocIdx}
                            />
                        ))}
                    </div>
                    <div className="py-2 items-center flex justify-center">
                        <button onClick={addLocation} className="bg-black w-1/4 py-2 mx-auto rounded-md">
                            <span className="text-white">Add Location</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;