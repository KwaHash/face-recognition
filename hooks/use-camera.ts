"use client";

import { useState, useRef, useEffect } from "react";
import { FaceInfo, FacePosition } from "@/types/capture.d";
import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";

export const useCamera = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [faceInfo, setFaceInfo] = useState<FaceInfo | null>(null);
  const [detector, setDetector] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const initializeDetector = async () => {
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: "tfjs" as const,
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
        modelType: "full" as const,
      } as const;
      const detectorObject = await faceDetection.createDetector(
        model,
        detectorConfig
      );
      setDetector(detectorObject);
      setIsLoading(false);
    };

    initializeDetector();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (showCamera) startCamera();
    else stopCamera();
  }, [showCamera, detector]);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        setIsVideoReady(true);
        startFaceDetection();
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setFaceInfo(null);
    setIsVideoReady(false);
  };

  const startFaceDetection = async () => {
    if (!videoRef.current || !detector) return;

    const detectFace = async () => {
      if (!videoRef.current) return;

      try {
        const videoElement = videoRef.current;

        if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
          return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d", { willReadFrequently: false });
        if (!context) return;

        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const containerWidth = videoElement.clientWidth;
        const containerHeight = videoElement.clientHeight;
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const estimationConfig = { flipHorizontal: true };
        const faces = await detector.estimateFaces(imageData, estimationConfig);
        if (faces.length > 0) {
          const face = faces[0];
          getFaceInfo(face, imageData);
        } else {
          setFaceInfo(null);
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }

      animationFrameRef.current = requestAnimationFrame(detectFace);
    };

    detectFace();
  };

  const getFaceInfo = (face: FacePosition, imageData: ImageData) => {
    if (!videoRef.current) return;

    const { xMin, yMin, xMax, yMax, width, height } = face.box;
    const videoWidth = videoRef.current.clientWidth;
    const videoHeight = videoRef.current.clientHeight;

    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;

    // Define position thresholds
    const positionChecks = [
      {
        condition: centerX > videoWidth * 0.6,
        message: "左に移動してください。",
      },
      {
        condition: centerX < videoWidth * 0.4,
        message: "右に移動してください。",
      },
      {
        condition: centerY > videoHeight * 0.6,
        message: "上に移動してください。",
      },
      {
        condition: centerY < videoHeight * 0.4,
        message: "下に移動してください。",
      },
      {
        condition: width < videoWidth * 0.3 || height < videoHeight * 0.3,
        message: "顔を大きくしてください。",
      },
      {
        condition: width > videoWidth * 0.7 || height > videoHeight * 0.7,
        message: "顔を小さくしてください。",
      },
    ];

    // Generate feedback and check if any position adjustments are needed
    const positions = positionChecks
      .filter((check) => check.condition)
      .map((check) => check.message);

    const isPositionCorrect = positionChecks.every((check) => !check.condition);

    const data = imageData.data;
    let sum = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      sum += (r + g + b) / 3;
    }

    const brightness = sum / (data.length / 4);

    setFaceInfo({
      box: face.box,
      keypoints: face.keypoints,
      isCorrect: isPositionCorrect,
      feedbacks: positions,
      brightness,
    });
  };

  return {
    showCamera,
    setShowCamera,
    isVideoReady,
    faceInfo,
    isLoading,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
  };
};
