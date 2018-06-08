import React from 'react';
import {XYPlot, ArcSeries } from 'react-vis';
import './style/taskArcDisplay.css';

/*
output hr/min/sec counting down before changing to ArcSeries
*/

const PI = Math.PI;

const TaskArcDisplay = ({hr, min, sec}) => {
    return (
        <div id='task-arc-display-container'>
            <div id='task-arc-display'>
                <XYPlot
                    xDomain={[-1, 1]}
                    yDomain={[-1, 1]}
                    width={280}
                    height={280}
                    center={{x: 0, y: 0}}   
                    
                    fill='#25282E' 
                    stroke='#58D9FA'
                    getAngle={d => d.time}
                    getAngle0={d => 2 * PI}>
                    <ArcSeries
                        animation={{
                            damping: 8,
                            stiffness: 300
                        }}
                        radiusDomain={[0, 3]}
                        data={[
                            {time: sec / 60 * 2 * PI, radius0: 1, radius: 1.5, },
                            {time: min / 60 * 2 * PI, radius0: 1.6, radius: 2.1, },
                            {time: hr / 24 * 2 * PI, radius0: 2.2, radius: 2.7, },
                        ]}
                    />
                </XYPlot>
            </div> 
        </div>
    );
}

export default TaskArcDisplay;