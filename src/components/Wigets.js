import React, { useEffect } from 'react'
import '../styles/wigets.css';
import { useSelector, useDispatch } from 'react-redux';
import { getEvants } from '../actions/eventAction';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Wigets = () => {
    
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.events);
    
    useEffect(() => {
        dispatch(getEvants())
    },[])

    return (
        <div className="widgets">
            <div className="widgets_header">
                <h2>LInkIn News</h2>
            </div>
            {events.map((event) => (
                <div className="widget_articles">
                    <div className="widgets_articleLeft" >
                        <ArrowRightIcon/>
                    </div>
                    <div className="widgets_articleRight" >
                        <h4>{event.message}</h4>
                        <p>{event.eventDate}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Wigets
