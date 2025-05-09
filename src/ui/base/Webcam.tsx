import { ReactNode, useEffect, useRef, useState } from "react";

import { ErrorMessage } from "./ErrorMessage";

export const Webcam = ({
  children,
  className,
}: {
  children: (props: { takeScreenshot: () => null | string }) => ReactNode;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [error, setError] = useState<0 | 1 | string>(0);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(1);
    } catch (err) {
      console.error("Failed to access webcam", err);
      setError("카메라에 접근할 수 없습니다.");
    }
  };

  const takeScreenshot = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      return image;
    }
    return null;
  };

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      // Stop all tracks when unmounting
      if (video?.srcObject instanceof MediaStream) {
        video?.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {typeof error === "string" ? (
        <ErrorMessage error={error} />
      ) : error == 0 ? (
        <button onClick={startCamera}>카메라 켜기</button>
      ) : null}
      <video autoPlay className={className} muted playsInline ref={videoRef} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {children({ takeScreenshot })}
    </div>
  );
};
