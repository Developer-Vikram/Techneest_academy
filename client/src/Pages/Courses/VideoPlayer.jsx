const VideoPlayer = ({ src, libId }) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        No video found
      </div>
    );
  }

  if (!libId) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        Video library ID not found
      </div>
    );
  }

  const cleanSrc = String(src).trim();

  let videoGuid = cleanSrc;

  // If full Bunny CDN URL is provided
  if (cleanSrc.includes("b-cdn.net")) {
    const parts = cleanSrc.split("/").filter(Boolean);

    // Find UUID instead of relying on parts[3]
    const guid = parts.find((part) =>
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(part)
    );

    if (guid) {
      videoGuid = guid;
    }
  }

  // If src is already an iframe player URL
  if (cleanSrc.includes("iframe.mediadelivery.net/play/")) {
    return (
      <div className="w-full h-full bg-black">
        <iframe
          src={cleanSrc}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ border: "none" }}
          title="Course Video"
        />
      </div>
    );
  }

  const finalUrl =
    `https://iframe.mediadelivery.net/play/${String(libId).trim()}/${videoGuid}`;

  console.log("🎬 Bunny Player:", {
    libraryId: libId,
    videoGuid,
    src: cleanSrc,
    finalUrl,
  });

  return (
    <div className="w-full h-full bg-black">
      <iframe
        src={finalUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        style={{ border: "none" }}
        title="Course Video"
      />
    </div>
  );
};

export default VideoPlayer;