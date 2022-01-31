import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del jefeee',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcoolor: '#fafafa',
//     notes: 'comprar pastel',
//     user: {
//         _id: '123',
//         name: 'Karen'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    //TODO: Leer del store los eventos
    const { events, activeEvent } = useSelector(state => state.calendar)

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );

    const onDoubleClick = (e) => {
        // console.log('abrir modal')
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }
    const onViewChange = (e) => {
        setLastView(e); 
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = () => {
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#D169A3',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        }

        return {
            style
        }
    };

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick} //Doble click 
                onSelectEvent={onSelectEvent} //Click se dispare
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEvent
                }}
            />
                {/* Boton + */}
                <AddNewFab/>

                {/* Boton Delete */}
                {
                    (activeEvent) && <DeleteEventFab/>
                }
                

            <CalendarModal/>
        </div>
    )
}
