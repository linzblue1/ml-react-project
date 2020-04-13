import React, { useRef, useEffect } from 'react';
import p5 from 'p5'
import ml5 from 'ml5'


const Webcam = props => {
    const myRef = useRef();

    useEffect(() => {
        myp5 = new p5(sketch, myRef)

    });

    const sketch = (p) => {
        // let x = 100;
        // let y = 100;

        p.setup = () => {
            p.createCanvas(640, 480);
            p.background(0)
        };

        // p.draw = () => {
        //     p.background(0);
        //     p.fill(255);
        //     p.rect(x, y, 50, 50);
        // };


    };
    let myp5 = new p5(sketch);
    console.log(useEffect)
    return (
        <div ref={myRef}>

        </div>
    )
}

export default Webcam;