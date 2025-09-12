import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  description: string;
  onVideoComplete?: () => void;
}

const VideoPlayer = ({
  videoUrl,
  title,
  description,
  onVideoComplete,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      // Simulate video progress for demo
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            onVideoComplete?.();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  return (
    <Card className="eco-card mb-8">
      <CardContent className="p-0">
        {/* Video Container */}
        <div className="relative aspect-video bg-muted rounded-t-xl overflow-hidden">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allowFullScreen
              title={title}
            />
          ) : (
            <div className="w-full h-full eco-gradient-light flex items-center justify-center">
              <div className="text-center">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="eco-gradient text-primary-foreground hover:opacity-90 mb-4"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 mr-2" />
                  ) : (
                    <Play className="w-6 h-6 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Play"} Training Video
                </Button>
                {isPlaying && (
                  <div className="w-64 mx-auto">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-white/80 text-sm mt-2">
                      {progress}% complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
