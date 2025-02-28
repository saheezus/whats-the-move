import React from 'react';
import { Link } from 'react-router-dom';
import { Users, User, BookOpen } from 'lucide-react';
import {APIProvider, Map} from "@vis.gl/react-google-maps";

const Home = () => {
  return (
    <div className="bg-white flex flex-col p-6">
        <div className="bg-gray-100 grid grid-cols-3 shadow-sm flex p-6">
            <div className="col-span-2 flex flex-col">
                <div className="flex flex-col">
                    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} className="rounded-xl inline-block">
                        <Map
                            style={{width: '60vw', height: '80vh', borderRadius: '10rem'}}
                            defaultCenter={{lat: 42, lng: 14}}
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
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Place Category"/>
                </div>
                <div className="p-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Location"/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;