import React from 'react';
import { useSelector } from 'react-redux';
import sty from "./EmptyDB.module.css"

export default function EmptyDB ({dogs, allDogs}) {
    const dark = useSelector((state) => state.dark);
    return (
        <div className={dark? sty.dark_empty:sty.empty}>
            {
                dogs.message?
                <h2>{dogs&&dogs.message}</h2>:
                typeof allDogs[0].id!=="number"?
            <h2>No dog found with that temperament in the database</h2>:
            <h2>Database empty</h2>
        
            }   
        </div>
    );
};

