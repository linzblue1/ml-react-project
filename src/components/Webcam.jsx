import React, { useRef, useEffect, useState } from 'react';
import p5, { VIDEO } from 'p5'
import ml5 from 'ml5'


const Webcam = props => {
    const myRef = useRef();
    const [label, setLabel] = useState([
        { label: 'Starting Label', confidence: 0 },
    ]);

    useEffect(() => {
        let myp5 = new p5(sketch, myRef.current)
    }, []);


    const sketch = (p) => {


        let mobilenet;
        let cam;
        let classifier;
        let thumbUpRight;
        let thumbDownRight;
        let thumbUpLeft;
        let thumbDownLeft;
        let trainButton;
        // let label = '';


        const modelReady = () => {
            console.log('Model is ready!');
        }

        const videoReady = () => {
            console.log('Video is ready!');
        }

        const whileTraining = (loss) => {
            if (loss == null) {
                console.log('Training Complete')
                classifier.classify(gotResults)
            } else {
                console.log(loss)
            }
        }



        const gotResults = (error, result) => {
            if (error) {
                console.error(error);
            } else {
                console.log(result)
                setLabel(result);
                classifier.classify(gotResults);
            }

        }



        p.setup = () => {
            p.createCanvas(640, 550);
            cam = p.createCapture(VIDEO);
            cam.hide();
            p.background(0)
            mobilenet = ml5.featureExtractor('MobileNet', modelReady)
            classifier = mobilenet.classification(cam, videoReady)

            thumbUpRight = p.createButton('Up Right');
            thumbUpRight.mousePressed(function () {
                classifier.addImage('thumbUpRight');
            })

            thumbDownRight = p.createButton('Down Right');
            thumbDownRight.mousePressed(function () {
                classifier.addImage('thumbDownRight');
            })

            thumbUpLeft = p.createButton('Up Left');
            thumbUpLeft.mousePressed(function () {
                classifier.addImage('thumbUpLeft');
            })


            thumbDownLeft = p.createButton('Down Left');
            thumbDownLeft.mousePressed(function () {
                classifier.addImage('thumbDownLeft');
            })


            trainButton = p.createButton('Train');
            trainButton.mousePressed(function () {
                classifier.train(whileTraining);
            })
        };


        p.draw = () => {

            p.background(0);
            p.image(cam, 0, 0)
            p.fill(255);
            p.textSize(32);
            p.text(label[0].label, 10, 530);
        }

    };

    return (
        <div ref={myRef}>

        </div>
    )
}

export default Webcam;