import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";

export const Webcam = ({
  children,
  className,
}: {
  children: (props: { takeScreenshot: () => null | string }) => ReactNode;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Failed to access webcam", err);
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
      <video
        autoPlay
        className={classNames("w-full bg-zinc-900", className)}
        muted
        onClick={() => {
          if (!videoRef.current?.srcObject) {
            startCamera();
            console.log("init cam");
          }
        }}
        playsInline
        ref={videoRef}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {children({ takeScreenshot })}
    </div>
  );
};
