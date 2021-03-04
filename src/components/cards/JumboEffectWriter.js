import React from "react";
import Typewriter from "typewriter-effect";


const JumboEffectWriter = ({ text }) => (

    <Typewriter
        options={{
            strings: text,
            autoStart: true,
            loop: true,
        }}
    />
);

export default JumboEffectWriter