import React, { Component } from 'react';
import "./slider.css"
import image1 from "./images/homepage1.png";
import image2 from "./images/homepage3.png";
import image3 from "./images/homepage22.png";
class AutoImageSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [
                image1,
                image2,
                image3,
            ],
            currentIndex: 0,
        };

        this.timer = null;
    }

    componentDidMount() {
        this.startSlider();
    }

    componentWillUnmount() {
        this.stopSlider();
    }

    startSlider = () => {
        this.timer = setInterval(this.nextSlide, 3000); // Change slide every 3 seconds
    }

    stopSlider = () => {
        clearInterval(this.timer);
    }

    nextSlide = () => {
        this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex + 1) % this.state.images.length,
        }));
    }

    render() {
        const { images, currentIndex } = this.state;

        return (
            <div className="auto-image-slider">
                <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
            </div>
        );
    }
}

export default AutoImageSlider;
