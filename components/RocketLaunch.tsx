"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import rocketAnimation from "@/public/lotties/rocket.json"; // Update with your JSON file path
import { useEffect, useState } from "react";

export default function RocketLaunch() {
    const [launch, setLaunch] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timeoutId: any = null;

        const startAnimationLoop = () => {
            // Wait for 7 seconds (rocket stays in the middle)
            timeoutId = setTimeout(() => {
                setLaunch(true); // Fly up and disappear
            }, 7000); // 7 seconds delay

            // Reset after 10 seconds (total loop duration)
            setTimeout(() => {
                setLaunch(false); // Reset rocket to middle
                startAnimationLoop(); // Restart the loop
            }, 10000); // 10 seconds total loop duration
        };

        startAnimationLoop(); // Start the loop

        return () => {
            clearTimeout(timeoutId); // Cleanup timeout on unmount
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 0, opacity: 1 }} // Start in the middle
            animate={{
                y: launch ? -800 : 0, // Fly up to -800 when launching, otherwise stay at 0 (middle)
                opacity: launch ? 0 : 1, // Fade out when launching
            }}
            transition={{
                duration: 3, // Animation duration (3 seconds for flying up)
                ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 ml-40 transform -translate-x-1/2 w-[250px] h-[250px]"
        >
            <Lottie animationData={rocketAnimation} loop={true} />
        </motion.div>
    );
}