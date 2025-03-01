import React from 'react';
import { Link } from 'react-router-dom';
import { Users, User, BookOpen } from 'lucide-react';
import { APIProvider, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import Autocomplete from 'react-google-autocomplete';

const PlacesInput = () => {
    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
            console.log(place);
        },
    });

    return <input 
            className="bg-gray-100 rounded w-full py-2 px-3 text-gray-700  focus:outline-none" 
            id="username" 
            type="text" 
            placeholder="Location"
            ref={ref}
    />;
}

const Home = () => {

    return (
        <div className="bg-white flex flex-col p-6">
            <div className="bg-gray-100 grid grid-cols-3 shadow-sm flex p-6">
                <div className="col-span-2 flex flex-col">
                    <div className="flex flex-col">
                        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} className="rounded-xl inline-block">
                            <Map
                                style={{width: '60vw', height: '80vh', borderRadius: '10rem'}}
                                defaultCenter={{lat: 47.6, lng: -122}}
                                defaultZoom={7}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            />
                        </APIProvider>
                    </div>
                </div>
                <div className="bg-white flex-col flex justify-center items-center"> 
                    <div className="">
                        <span className="text-2xl text-bold">What's the move?</span>
                    </div>
                    <div className="p-2">
                        <input 
                            className="bg-gray-100 rounded w-full py-2 px-3 text-gray-700  focus:outline-none" 
                            id="username" 
                            type="text" 
                            placeholder="Place Category"
                        />
                    </div>
                    <div className="p-2">
                        <APIProvider
                            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                            libraries={["places"]}
                        >
                            <PlacesInput />
                        </APIProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;