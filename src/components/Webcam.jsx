import React, { useRef, useEffect, useState } from 'react';
import p5, { VIDEO, height } from 'p5'
import ml5 from 'ml5'


const Webcam = props => {
    const myRef = useRef();
    let [label, setLabel] = useState('')

    useEffect(() => {
        let myp5 = new p5(sketch, myRef.current)
    });


    const sketch = (p) => {


        let mobilenet;
        let cam;
        // let label = '';


        const modelReady = () => {
            console.log('Model is ready!');
            mobilenet.predict(gotResults)
        }


        const gotResults = (error, results) => {
            if (error) {
                console.error(error);
            } else {
                // console.log(results)
                setLabel(results[0].label);
                mobilenet.predict(gotResults)
            }

        }
        // p.imageReady() {
        //     image(puffin, 0, 0, width, height)
        // }


        p.setup = () => {
            p.createCanvas(640, 550);
            cam = p.createCapture(VIDEO);
            cam.hide();
            p.background(0)
            mobilenet = ml5.imageClassifier('MobileNet', cam, modelReady)
        };

        p.draw = () => {
            p.background(0)
            p.image(cam, 0, 0)
            p.fill(255);
            p.textSize(32);
            p.text(label, 10, height - 20);
        }

    };

    return (
        <div ref={myRef}>

        </div>
    )
}

export default Webcam;