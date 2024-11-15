import { useEffect, useRef } from "react";

const AudioVisualizer = ({
  mediaStream = null,
  isRecording = false,
  height = "32px",
  barColor = "#4F46E5",
  backgroundColor = "#F6F3E9",
  barWidth = 3,
  barGap = 1,
  smoothingTimeConstant = 0.8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!mediaStream || !isRecording) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize audio context and analyser
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source =
        audioContextRef.current.createMediaStreamSource(mediaStream);
      source.connect(analyserRef.current);
    }

    const analyser = analyserRef.current;
    analyser.fftSize = 128; 
    analyser.smoothingTimeConstant = smoothingTimeConstant;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      analyser.getByteFrequencyData(dataArray);

      // Clear the canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Calculate how many bars we can fit
      const totalBars = Math.floor(width / (barWidth + barGap));
      const usableWidth = totalBars * (barWidth + barGap);
      const startX = (width - usableWidth) / 2;

      // Draw the waveform bars
      for (let i = 0; i < totalBars; i++) {
        // Use a smaller portion of the frequency data
        const dataIndex = Math.floor((i / totalBars) * (bufferLength * 0.75));
        const value = dataArray[dataIndex];

        // Calculate bar height based on audio data
        const barHeight = Math.max((value / 255) * height * 0.8, 4);
        const x = startX + i * (barWidth + barGap);

        // Draw upper bar (mirror of lower bar)
        const upperBarHeight = barHeight / 2;
        ctx.beginPath();
        ctx.fillStyle = barColor;
        roundedRect(
          ctx,
          x,
          centerY - upperBarHeight,
          barWidth,
          upperBarHeight,
          barWidth / 2
        );
        ctx.fill();

        // Draw lower bar
        ctx.beginPath();
        roundedRect(ctx, x, centerY, barWidth, upperBarHeight, barWidth / 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Helper function to draw rounded rectangles
    const roundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    mediaStream,
    isRecording,
    barColor,
    backgroundColor,
    barWidth,
    barGap,
    smoothingTimeConstant,
  ]);

  return (
    <div className="w-fit">
      <canvas
        ref={canvasRef}
        className="w-full h-fit rounded-md"
        height={height}
        style={{ height }}
        width={200}
      />
    </div>
  );
};

export default AudioVisualizer;
