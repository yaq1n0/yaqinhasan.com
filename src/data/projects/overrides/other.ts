import { FullProject } from "../../models/Project";

export const otherOverrides: Record<string, Partial<FullProject>> = {
  ThymPi: {
    description: "Proof-of-concept robotics platform using sensor data to augment visual navigation systems for autonomously navigating robots.",
    category: "Other",
    status: "Complete",
    keywords: ["Python", "OpenCV", "Machine Vision", "Robotics", "Autonomous Navigation", "Final year project"],
    htmlDescription: `
    <h4>Project Definition</h4>
    <p>
      The official title of my dissertation was "An Intelligent Approach to Navigating Environments With Compliant Obstacles". Like most academic titles, it
      likely means very little to you. The gist of it is that obstacles fall on a spectrum of compliance, which is a fancy way of saying how easy they are
      to move aside or get through.
    </p>
    <p>
      Essentially, if you have a robot that is navigating solely visually, it has no context for what an obstacle's compliance is. You would have to
      manually add compliance context to the object detection and classification model. This is suboptimal for many reasons, which is why you'd probably
      want to have the robot to be able to do this on its own.
    </p>
    <p>
      A side note, with recent advancements in AI, training a model with a limited set of known object/compliance pairs and having it extrapolate the data
      is a lot more realistic and robust of a solution.
    </p>
    <h4>Summary of Final Prototype</h4>
    <p>
      The goal of my project was to design, implement and test a prototype robotics platform to demonstrate "An Intelligent Approach to Navigating
      Environments With Compliant Obstacles".
    </p>
    <p>
      I had a Raspberry Pi 3 running the OpenCV object classification model, compliance testing logic and Thymio control program (asebamedulla). Everything
      was written in Python with the Pi 3 was connected to a Pi camera, the MPU6050 inertial measurement unit (accelerometer and gyroscope) and the Thymio
      robot.
    </p>
    <p>
      The final prototype was able to identify and classify obstacles, then it would decide to test the compliance of the obstacle if it was unknown to it.
      In theory, this would then be coupled with a navigation algorithm, using the compliance values to augment the different path "weights" to come up with
      the most efficient real-life path.
    </p>`,
    order: 1
  },
  "opl-py": {
    description:
      "Open source Python SDK and dockerised web app for querying and analysing OpenPowerlifting data, with performance prediction using machine learning",
    category: "Other",
    status: "In Progress",
    keywords: ["Python", "FastAPI", "React", "Docker", "scikit-learn", "PyTorch", "PyPI", "Machine Learning", "Data analytics"],
    order: 2
  },
  "CyberVehiclesOverhaul-2.1PL": {
    description: "Cyberpunk 2077 mod extending CyberVehiclesOverhaul with Phantom Liberty vehicles and version 2.1 support",
    category: "Other",
    status: "Complete",
    keywords: ["Lua", "Game Modding", "Cyberpunk 2077"],
    order: 3
  }
};
