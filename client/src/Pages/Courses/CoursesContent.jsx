import React, { useEffect, useState, useMemo, useCallback,useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import {
  FaPlayCircle,
  FaChevronLeft,
  FaLock,
  FaImage,
  FaFilePdf,
  FaCheckCircle,
  FaDownload,
  FaListUl,
  FaInfoCircle,
  FaTrophy,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaGithub,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import CreateDiscussionModal from "../../Components/CreateDiscussionModal";

import { downloadVideoPdf, getCourse, getCourseContentByCourseId } from "../../redux/slices/courseSlice";
import { saveVideoProgress, getUserCourseProgress } from "../../redux/slices/progressSlice";
import MeetingRequest from "../MeetingRequest";
import AssignmentComponent from "../../Components/AssignmentComponent";
import { api } from "../../redux/slices/api";


/* ============================================================
   WATERMARK KEYFRAMES (injected once)
   ============================================================ */
const watermarkStyleId = "watermark-keyframes-style";
if (typeof document !== "undefined" && !document.getElementById(watermarkStyleId)) {
  const style = document.createElement("style");
  style.id = watermarkStyleId;
  style.textContent = `
    @keyframes watermarkDrift {
      0%   { top: 10%; left: 5%; }
      20%  { top: 80%; left: 7%; }
      40%  { top: 80%; left: 65%; }
      60%  { top: 10%; left: 65%; }
      80%  { top: 80%; left: 15%; }
      100% { top: 10%; left: 5%; }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   PDF VIEWER MODAL COMPONENT
   ============================================================ */
const PDFViewerModal = ({
  pdfUrl,
  title = "Lecture PDF",
  onClose,
  videoId,
  contentId,
}) => {
  const [viewMode, setViewMode] = useState("embed");
  const [isMobile, setIsMobile] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const dispatch = useDispatch();
  const { downloadLoading, downloadError } = useSelector((state) => state.courses);

  // Mobile check with orientation support
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  // ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Show error toast or notification for download failure
  useEffect(() => {
    if (downloadError) {
      console.error("Download failed:", downloadError);
      // You can integrate a toast notification here
      // toast.error("Failed to download PDF. Please try again.");
    }
  }, [downloadError]);

  // Google Viewer URL
  const googleViewerUrl = useMemo(() => {
    if (!pdfUrl) return "";
    return `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  }, [pdfUrl]);

  // Validate PDF URL
  const isValidPdfUrl = useMemo(() => {
    if (!pdfUrl) return false;
    try {
      const url = new URL(pdfUrl);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }, [pdfUrl]);

  // Handle download with retry logic
  const handleDownload = useCallback(() => {
    if (downloadLoading) return;
    dispatch(downloadVideoPdf({ contentId, videoId }));
  }, [dispatch, contentId, videoId, downloadLoading]);

  // Auto-retry on failure (optional - up to 2 retries)
  useEffect(() => {
    if (downloadError && retryCount < 2) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        handleDownload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [downloadError, retryCount, handleDownload]);

  // Reset loading state when view mode changes
  useEffect(() => {
    setIsLoading(true);
    setPdfError(false);
  }, [viewMode]);

  // Handle PDF load success
  const handlePdfLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  // Handle PDF load error
  const handlePdfError = () => {
    setIsLoading(false);
    setPdfError(true);
  };

  // Render error state if URL is invalid
  if (!isValidPdfUrl) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Invalid PDF URL</h3>
            <p className="text-slate-600 mb-6">The PDF file cannot be loaded or the URL is invalid.</p>
            <button
              onClick={onClose}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full h-full md:h-[92vh] md:max-w-5xl md:rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2 min-w-0">
            <FaFilePdf className="text-red-500 shrink-0" size={18} />
            <span className="font-bold text-slate-800 truncate text-sm md:text-base">
              {title}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Viewer switch - only show on desktop */}
            {!isMobile && (
              <button
                onClick={() => setViewMode((v) => (v === "embed" ? "google" : "embed"))}
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <FaExpand size={11} />
                {viewMode === "embed" ? "Try Alt Viewer" : "Default Viewer"}
              </button>
            )}

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={downloadLoading}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaDownload size={11} />
              {downloadLoading ? "Downloading..." : "Download"}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-slate-800"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        {/* PDF View with Loading and Error States */}
        <div className="flex-1 overflow-hidden bg-slate-100 relative">
          {/* Loading Spinner */}
          {isLoading && !pdfError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-sm text-slate-600 font-medium">Loading PDF...</p>
                <p className="text-xs text-slate-400">Please wait while the document loads</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {pdfError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
              <div className="text-center p-6 max-w-md">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-red-500 text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Failed to Load PDF</h3>
                <p className="text-slate-600 mb-4">
                  The PDF viewer couldn't load the document. This might be due to:
                </p>
                <ul className="text-sm text-slate-500 text-left mb-6 space-y-1">
                  <li>• Network connectivity issues</li>
                  <li>• The PDF file might be corrupted</li>
                  <li>• The server might be temporarily unavailable</li>
                </ul>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      setPdfError(false);
                      // Force reload by toggling view mode
                      setViewMode(prev => prev === "embed" ? "google" : "embed");
                    }}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    Retry
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    Download Instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          {!pdfError && (
            <>
              {isMobile ? (
                <iframe
                  key={`mobile-${viewMode}`}
                  src={googleViewerUrl}
                  title={title}
                  className="w-full h-full border-none"
                  allow="fullscreen"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                />
              ) : viewMode === "embed" ? (
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label={title}
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                >
                  {/* Fallback if object fails */}
                  <div className="flex items-center justify-center h-full bg-slate-100">
                    <div className="text-center p-6">
                      <FaFilePdf className="text-red-400 text-5xl mx-auto mb-3" />
                      <p className="text-slate-600 mb-2">Unable to display PDF inline</p>
                      <button
                        onClick={() => setViewMode("google")}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Try alternative viewer
                      </button>
                    </div>
                  </div>
                </object>
              ) : (
                <iframe
                  src={googleViewerUrl}
                  title={title}
                  className="w-full h-full border-none"
                  allow="fullscreen"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                />
              )}
            </>
          )}
        </div>

        {/* Mobile Footer - Only show when not in error state */}
        {!pdfError && (
          <div className="sm:hidden px-4 py-3 border-t border-slate-200 bg-white shrink-0">
            <button
              onClick={handleDownload}
              disabled={downloadLoading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaDownload size={14} />
              {downloadLoading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        )}

        {/* Keyboard shortcuts hint (optional) */}
        <div className="hidden md:block absolute bottom-4 right-4 text-xs text-white/40 bg-black/20 px-2 py-1 rounded">
          Press ESC to close
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   WATERMARK COMPONENT
   ============================================================ */
const VideoWatermark = ({ email }) => (
  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
    <div
      style={{
        position: "absolute",
        animation: "watermarkDrift 70s ease-in-out infinite",
        willChange: "top, left, opacity",
      }}
    >
      <span
        className="font-semibold whitespace-nowrap select-none text-gray-300 opacity-50"
        style={{
          fontSize: "15px",
          textShadow: "0 1px 6px rgba(0,0,0,0.8)",
          letterSpacing: "0.5px",
        }}
      >
        {email}
      </span>
    </div>
  </div>
);

const NEXT_VIDEO_PROMPT_SECONDS = 20;
const MAX_TRACKED_TIMEUPDATE_DELTA = 3.5;

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const VideoCoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const lastWatchedLoadedRef = useRef(null);
  const watchedTrackerRef = useRef({ videoId: null, lastTime: null });

  const { singleCourse: course, courseContent = [], loading } = useSelector((s) => s.courses);



  const LIB_ID = course?.lib_id ? String(course.lib_id).trim() : "";

  console.log(LIB_ID)

  const { videos = [] } = useSelector((s) => s.progress);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [blackout, setBlackout] = useState({ show: false, msg: "" });
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [unlockedVideos, setUnlockedVideos] = useState(new Set());
  const [activeTab, setActiveTab] = useState("lessons");
  const [openModules, setOpenModules] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
  const [showNextVideoPrompt, setShowNextVideoPrompt] = useState(false);
  const [watchedDurationByVideo, setWatchedDurationByVideo] = useState({});
  const [optimisticCompletedVideoIds, setOptimisticCompletedVideoIds] = useState(new Set());

  // ✅ NEW: PDF Modal state
  const [showPdfModal, setShowPdfModal] = useState(false);

  const allowPlaylistAccess = course?.allowPlaylistAccess || false;

  const saveLastWatchedVideo = useCallback((videoId) => {
    if (videoId && id) localStorage.setItem(`last_watched_${id}`, videoId);
  }, [id]);
  const getLastWatchedVideo = useCallback(() => (id ? localStorage.getItem(`last_watched_${id}`) : null), [id]);

  const getVideoPositionKey = useCallback((videoId) => {
    if (!id || !videoId) return null;
    return `video_position_${id}_${videoId}`;
  }, [id]);

  const getSavedVideoTime = useCallback((videoId) => {
    const key = getVideoPositionKey(videoId);
    if (!key) return 0;
    const saved = localStorage.getItem(key);
    const seconds = parseFloat(saved);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  }, [getVideoPositionKey]);

  const saveVideoTime = useCallback((videoId, time) => {
    const key = getVideoPositionKey(videoId);
    if (!key || !Number.isFinite(time) || time < 0) return;
    localStorage.setItem(key, String(time));
  }, [getVideoPositionKey]);

  const getWatchedDurationKey = useCallback((videoId) => {
    if (!id || !videoId) return null;
    return `video_watched_duration_v2_${id}_${videoId}`;
  }, [id]);

  const getSavedWatchedDuration = useCallback((videoId) => {
    const key = getWatchedDurationKey(videoId);
    if (!key) return 0;
    const saved = localStorage.getItem(key);
    const seconds = parseFloat(saved);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  }, [getWatchedDurationKey]);

  const hasSavedWatchedDuration = useCallback((videoId) => {
    const key = getWatchedDurationKey(videoId);
    return !!key && localStorage.getItem(key) !== null;
  }, [getWatchedDurationKey]);

  const saveWatchedDuration = useCallback((videoId, seconds) => {
    const key = getWatchedDurationKey(videoId);
    if (!key || !Number.isFinite(seconds) || seconds < 0) return;
    localStorage.setItem(key, String(seconds));
    setWatchedDurationByVideo(prev => ({ ...prev, [videoId]: seconds }));
  }, [getWatchedDurationKey]);

  const findModuleIndexOfVideo = useCallback((videoId) => {
    if (!courseContent.length || !videoId) return 0;
    for (let i = 0; i < courseContent.length; i++) {
      if (courseContent[i].videos?.some(v => v._id === videoId)) return i;
    }
    return 0;
  }, [courseContent]);

  useEffect(() => {
    if (currentVideo && courseContent.length) {
      const moduleIndex = findModuleIndexOfVideo(currentVideo._id);
      setCurrentModuleIndex(moduleIndex);
      setOpenModules(prev => ({ ...prev, [moduleIndex]: true }));
    }
  }, [currentVideo, courseContent, findModuleIndexOfVideo]);

  useEffect(() => {
    if (!id) return;
    dispatch(getCourse(id));
    dispatch(getCourseContentByCourseId(id));
    dispatch(getUserCourseProgress(id));
  }, [dispatch, id]);

  useEffect(() => {
    const list = Array.isArray(courseContent)
      ? courseContent.flatMap(m => m?.videos || [])
      : [];

    if (list.length > 0 && !lastWatchedLoadedRef.current) {
      setAllVideos(list);
      const lastWatchedId = getLastWatchedVideo();
      if (lastWatchedId) {
        const lastVideo = list.find(v => v._id === lastWatchedId);
        setCurrentVideo(lastVideo || list[0]);
        setActiveVideoId(lastVideo?._id || list[0]._id);
      } else {
        setCurrentVideo(list[0]);
        setActiveVideoId(list[0]._id);
      }
      lastWatchedLoadedRef.current = true;
    }
  }, [courseContent, getLastWatchedVideo]);

  const completedVideoIds = useMemo(() => {
    const completed = new Set(videos.filter(v => v.progress_percent >= 100).map(v => v.video_id));
    optimisticCompletedVideoIds.forEach(videoId => completed.add(videoId));
    return completed;
  }, [videos, optimisticCompletedVideoIds]);
  const getSavedProgress = useCallback(
    (videoId) => videos.find(v => v.video_id === videoId)?.progress_percent || 0,
    [videos]
  );

  const parseDurationToSeconds = (duration) => {
    if (!duration) return 0;
    const parts = duration.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  };

  const formatSecondsToDuration = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const totalDurationSeconds = useMemo(() => {
    return allVideos.reduce((acc, v) => acc + parseDurationToSeconds(v.video_duration), 0);
  }, [allVideos]);

  const getCompletedProgressDuration = useCallback((videoId, durationSeconds) => {
    const progress = getSavedProgress(videoId);
    return durationSeconds > 0 && progress >= 100 ? durationSeconds : 0;
  }, [getSavedProgress]);

  const getEffectiveWatchedDuration = useCallback((video) => {
    if (!video?._id) return 0;
    const durationSeconds = parseDurationToSeconds(video.video_duration);
    const hasLiveValue = Object.prototype.hasOwnProperty.call(watchedDurationByVideo, video._id);
    if (hasLiveValue) return watchedDurationByVideo[video._id];
    if (hasSavedWatchedDuration(video._id)) return getSavedWatchedDuration(video._id);
    return getCompletedProgressDuration(video._id, durationSeconds);
  }, [getCompletedProgressDuration, getSavedWatchedDuration, hasSavedWatchedDuration, watchedDurationByVideo]);

  const totalCompletedDurationSeconds = useMemo(() => {
    return allVideos.reduce((acc, video) => {
      const dur = parseDurationToSeconds(video.video_duration);
      if (dur <= 0) return acc;
      const watched = getEffectiveWatchedDuration(video);
      return acc + Math.min(watched, dur);
    }, 0);
  }, [allVideos, getEffectiveWatchedDuration]);

  const totalDurationFormatted = formatSecondsToDuration(totalDurationSeconds);
  const completedDurationFormatted = formatSecondsToDuration(totalCompletedDurationSeconds);
  const durationProgressPercent = totalDurationSeconds > 0
    ? Math.round((totalCompletedDurationSeconds / totalDurationSeconds) * 100)
    : 0;

  const currentVideoIndex = useMemo(() => {
    if (!currentVideo) return -1;
    return allVideos.findIndex(v => v._id === currentVideo._id);
  }, [allVideos, currentVideo]);

  const nextVideo = currentVideoIndex >= 0 ? allVideos[currentVideoIndex + 1] : null;
  const canPlayNextVideo = !!nextVideo && (allowPlaylistAccess || unlockedVideos.has(nextVideo._id));

  const playNextVideo = useCallback((forceAfterCompletion = false) => {
    if (!nextVideo || (!forceAfterCompletion && !canPlayNextVideo)) return;
    setShowNextVideoPrompt(false);
    setCurrentVideo(nextVideo);
    setActiveVideoId(nextVideo._id);
    saveLastWatchedVideo(nextVideo._id);
    setExpandedAssignmentId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [canPlayNextVideo, nextVideo, saveLastWatchedVideo]);

  useEffect(() => {
    if (!allVideos.length) return;
    const unlocked = new Set();
    if (allowPlaylistAccess) {
      allVideos.forEach(v => unlocked.add(v._id));
    } else {
      unlocked.add(allVideos[0]._id);
      for (let i = 0; i < allVideos.length; i++) {
        if (completedVideoIds.has(allVideos[i]._id)) {
          unlocked.add(allVideos[i]._id);
          if (allVideos[i + 1]) unlocked.add(allVideos[i + 1]._id);
        }
      }
    }
    setUnlockedVideos(unlocked);
  }, [allVideos, completedVideoIds, allowPlaylistAccess]);

  // ============================================================
  // BUNNY VIDEO URL
  // Always rebuild the iframe URL using the CURRENT course lib_id.
  // This prevents an old library ID inside video_path from being used.
  // ============================================================
  const getBunnyIframeUrl = useCallback((src) => {
    if (!src || !LIB_ID) return "";

    const value = String(src).trim();

    // Find a Bunny video GUID anywhere in the stored value.
    const guidMatch = value.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    const guid = guidMatch?.[0];

    if (!guid) {
      console.error("❌ Bunny Video GUID not found:", value);
      return "";
    }

    const url = `https://iframe.mediadelivery.net/embed/${encodeURIComponent(LIB_ID)}/${guid}`;

    return `${url}?autoplay=false&preload=true&responsive=true`;
  }, [LIB_ID]);

  const bunnyVideoUrl = useMemo(() => {
    return currentVideo?.video_path
      ? getBunnyIframeUrl(currentVideo.video_path)
      : "";
  }, [currentVideo, getBunnyIframeUrl]);

  const [hlsLoaded, setHlsLoaded] = useState(false);

  const videosRef = useRef(videos);
  useEffect(() => { videosRef.current = videos; }, [videos]);

  useEffect(() => {
    setHlsLoaded(false);
    setVideoReady(false);
    setIsPlaying(false);
    setShowNextVideoPrompt(false);

    if (currentVideo) {
      saveLastWatchedVideo(currentVideo._id);
    }
  }, [currentVideo, saveLastWatchedVideo]);

  const loadAndPlay = useCallback(() => {
    if (!currentVideo || !bunnyVideoUrl) {
      console.error("❌ Bunny video URL missing", {
        video: currentVideo?.video_path,
        libId: LIB_ID,
        bunnyVideoUrl,
      });
      return;
    }

    console.log("========== BUNNY VIDEO ==========");
    console.log("LIB ID =>", LIB_ID);
    console.log("VIDEO PATH =>", currentVideo.video_path);
    console.log("IFRAME URL =>", bunnyVideoUrl);
    console.log("=================================");

    setHlsLoaded(true);
    setVideoReady(true);
    setIsPlaying(false);
  }, [currentVideo, bunnyVideoUrl, LIB_ID]);

  // Progress is controlled by the existing backend/local progress state.
  // Bunny iframe playback is cross-origin, so the native <video> APIs
  // (currentTime/duration/play/pause) must not be called on it.
  const saveProgress = useCallback((isCompleted = false) => {
    if (!currentVideo?._id) return;

    // Keep an explicit completion hook available for playlist transitions.
    if (isCompleted) {
      setOptimisticCompletedVideoIds(prev =>
        new Set([...prev, currentVideo._id])
      );

      dispatch(saveVideoProgress({
        course_id: id,
        video_id: currentVideo._id,
        progress_percent: 100,
      }));
    }
  }, [currentVideo, dispatch, id]);

  useEffect(() => {
    if (courseContent.length > 0 && Object.keys(openModules).length === 0) {
      const initialOpenState = {};
      courseContent.forEach((_, idx) => { initialOpenState[idx] = idx === 0; });
      setOpenModules(initialOpenState);
    }
  }, [courseContent]);

  const currentModule = useMemo(() => {
    if (!courseContent.length || !currentVideo) return null;
    return courseContent.find(module => module.videos?.some(video => video._id === currentVideo?._id));
  }, [courseContent, currentVideo]);

  const currentAssignment = useMemo(() => {
    if (!currentVideo?.assignments?.length) return null;
    return currentVideo.assignments[0];
  }, [currentVideo]);

  const toggleAssignment = (assignmentId) => {
    setExpandedAssignmentId(prev => prev === assignmentId ? null : assignmentId);
  };

  useEffect(() => {
    const triggerBlackout = (msg) => {
      setBlackout({ show: true, msg });
      setTimeout(() => setBlackout({ show: false, msg: "" }), 2000);
    };
    const onContext = (e) => { e.preventDefault(); triggerBlackout("Right Click Disabled"); };
    const onCopy = (e) => { e.preventDefault(); triggerBlackout("Copy Disabled"); };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCopy);
    document.addEventListener("paste", onCopy);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCopy);
      document.removeEventListener("paste", onCopy);
    };
  }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
  //       (e.ctrlKey && e.key.toUpperCase() === "U")
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       setBlackout({ show: true, msg: "Shortcut Disabled" });
  //       setTimeout(() => setBlackout({ show: false, msg: "" }), 2000);
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown, true);
  //   return () => document.removeEventListener("keydown", handleKeyDown, true);
  // }, []);

  const handleVideoSelect = (video) => {
    if (!unlockedVideos.has(video._id)) return;
    setShowNextVideoPrompt(false);
    setCurrentVideo(video);
    setActiveVideoId(video._id);
    saveLastWatchedVideo(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setExpandedAssignmentId(null);
  };

  const toggleModule = (moduleIndex) => {
    setOpenModules(prev => ({ ...prev, [moduleIndex]: !prev[moduleIndex] }));
  };

  const realTotalVideos = allVideos.length;
  const realCompletedVideos = allVideos.filter(v => completedVideoIds.has(v._id)).length;
  const realCoursePercent = realTotalVideos ? Math.round((realCompletedVideos / realTotalVideos) * 100) : 0;

  const [showFullDesc, setShowFullDesc] = useState(false);
  const description = currentVideo?.video_description || "";
  const shouldShowReadMore = description.length > 180;

  const LessonList = () => (
    <div className="space-y-3">
      {courseContent.map((module, moduleIdx) => {
        const isOpen = openModules[moduleIdx] || false;
        const moduleVideoCount = module.videos?.length || 0;
        const completedInModule = module.videos?.filter(v => completedVideoIds.has(v._id)).length || 0;
        const isCurrentModule = currentModuleIndex === moduleIdx;

        return (
          <div key={module._id || moduleIdx} className={`border rounded-xl overflow-hidden bg-white transition-all duration-300 ${isCurrentModule ? 'border-indigo-300 shadow-md ring-1 ring-indigo-200' : 'border-slate-200'}`}>
            <button onClick={() => toggleModule(moduleIdx)} className={`w-full flex items-center justify-between p-4 transition-colors cursor-pointer ${isCurrentModule ? 'bg-indigo-50 hover:bg-indigo-100' : 'bg-slate-50 hover:bg-slate-100'}`}>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">Module {moduleIdx + 1}</span>
                  <h3 className={`font-bold text-sm md:text-base ${isCurrentModule ? 'text-indigo-900' : 'text-slate-800'}`}>{module.title}</h3>
                  {isCurrentModule && <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">Currently Playing</span>}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">{moduleVideoCount} lectures</span>
                  {completedInModule > 0 && <span className="text-xs text-emerald-600">{completedInModule}/{moduleVideoCount} completed</span>}
                </div>
              </div>
              {isOpen ? <FaChevronUp className="text-slate-400" size={16} /> : <FaChevronDown className="text-slate-400" size={16} />}
            </button>

            <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden" }}>
              <div className="overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {module.videos?.map((video) => {
                    const isUnlocked = unlockedVideos.has(video._id);
                    const isActive = activeVideoId === video._id;
                    const isDone = completedVideoIds.has(video._id);
                    const videoProgress = getSavedProgress(video._id);

                    return (
                      <button
                        key={video._id}
                        disabled={!isUnlocked}
                        onClick={() => handleVideoSelect(video)}
                        className={`w-full text-left p-4 flex items-center gap-4 transition-all duration-200 ${isActive ? "bg-indigo-100 border-l-4 border-l-indigo-600" : "bg-white hover:bg-slate-50"} ${!isUnlocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="shrink-0">
                          {isDone ? <FaCheckCircle className="text-emerald-500" size={18} /> : !isUnlocked ? <FaLock className="text-slate-300" size={16} /> : <FaPlayCircle className={isActive ? "text-indigo-600" : "text-slate-400"} size={18} />}
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${isActive ? "text-indigo-700 font-semibold" : "text-slate-700"}`}>{video.video_title}</span>
                          {video.video_duration && <p className="text-xs text-slate-500 mt-1">⏱ {video.video_duration}</p>}
                          {videoProgress > 0 && videoProgress < 100 && !isDone && (
                            <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${videoProgress}%` }} />
                            </div>
                          )}
                        </div>
                        {isActive && <span className="text-xs text-indigo-600 shrink-0 font-medium">Playing Now</span>}
                        {isDone && !isActive && <span className="text-xs text-emerald-600 shrink-0">Completed</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading || !course) {
    return (
      <UserLayout>
        <div className="flex flex-col justify-center items-center h-[70vh] bg-slate-50">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Loading your classroom...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-white overflow-y-auto lg:overflow-hidden">
        <main className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-y-auto">
          <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg border border-slate-100"><FaChevronLeft size={16} /></button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-indigo-600 uppercase">Course Player</p>
                <h2 className="font-bold text-slate-800 truncate text-sm md:text-base">{course?.title || "Course"}</h2>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
              <FaTrophy className="text-indigo-600" size={12} />
              <span className="text-xs font-bold text-indigo-700">{realCoursePercent}%</span>
            </div>
          </nav>

          <div className="w-full bg-white flex items-center justify-center sticky top-[73px] mt-5 lg:relative lg:top-0 z-40">
            <div className="video-player-wrapper w-full max-w-5xl aspect-video bg-black shadow-2xl relative overflow-hidden">
              {bunnyVideoUrl ? (
                <iframe
                  key={`${currentVideo?._id}-${LIB_ID}-${bunnyVideoUrl}`}
                  src={bunnyVideoUrl}
                  title={currentVideo?.video_title || "Course Video"}
                  className="absolute inset-0 w-full h-full border-0 z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  onLoad={() => {
                    setHlsLoaded(true);
                    setVideoReady(true);
                  }}
                  onError={() => {
                    setHlsLoaded(false);
                    setVideoReady(false);
                    console.error("❌ Bunny iframe failed to load", bunnyVideoUrl);
                  }}
                />
              ) : (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black text-white">
                  <div className="text-center px-6">
                    <p className="font-bold">Video unavailable</p>
                    <p className="text-sm text-white/60 mt-2">
                      Bunny Library ID or Video GUID is missing.
                    </p>
                  </div>
                </div>
              )}

              {hlsLoaded && user?.email && (
                <VideoWatermark email={user.email} />
              )}

              {showNextVideoPrompt && nextVideo && (
                <div
                  className="absolute right-4 bottom-24 z-40 w-[min(92vw,360px)] rounded-xl border border-white/15 bg-black/85 p-4 text-white shadow-2xl backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Next lesson</p>
                      <h3 className="mt-1 truncate text-sm font-bold">{nextVideo.video_title}</h3>
                      {nextVideo.video_duration && (
                        <p className="mt-1 text-xs text-white/55">{nextVideo.video_duration}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNextVideoPrompt(false)}
                      className="shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      title="Dismiss"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={!canPlayNextVideo}
                    onClick={() => playNextVideo(false)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${canPlayNextVideo
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "cursor-not-allowed bg-white/10 text-white/45"
                      }`}
                  >
                    <FaPlay size={12} />
                    {canPlayNextVideo ? "Play next video" : "Unlocks after completion"}
                  </button>
                </div>
              )}

              {blackout.show && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                  <span className="text-white font-bold text-sm tracking-widest">{blackout.msg}</span>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-5xl mx-auto w-full p-6 lg:p-10">
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">{currentVideo?.video_title}</h1>
              <p className="text-gray-600 mt-4">
                {showFullDesc || !shouldShowReadMore ? description : `${description.slice(0, 180)}...`}
              </p>
              {shouldShowReadMore && (
                <button onClick={() => setShowFullDesc(!showFullDesc)} className="mt-2 text-blue-600 font-medium hover:text-blue-700">
                  {showFullDesc ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            <div className="flex bg-slate-200 p-1 rounded-xl mb-8 lg:hidden">
              <button onClick={() => setActiveTab("lessons")} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "lessons" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}><FaListUl className="inline mr-2" />Lessons</button>
              <button onClick={() => setActiveTab("resources")} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === "resources" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}><FaInfoCircle className="inline mr-2" />Resources</button>
            </div>

            <div className={`${activeTab === "resources" ? "block" : "hidden lg:block"} mb-10`}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FaDownload size={14} /> Course Materials</h3>
                {!currentVideo?.pdf_path && !currentVideo?.image_path && !currentVideo?.git_link ? (
                  <p className="text-sm text-slate-400 italic">No files for this lesson.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* ✅ PDF — opens embedded modal */}
                    {currentVideo?.pdf_path && (
                      <button
                        onClick={() => setShowPdfModal(true)}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-red-50 transition-all w-full text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <FaFilePdf className="text-red-500 shrink-0" size={20} />
                          <div>
                            <span className="text-sm font-bold text-slate-700 block">Lecture PDF</span>
                            <span className="text-xs text-slate-400 group-hover:text-red-400 transition-colors">Click to view &amp; download</span>
                          </div>
                        </div>
                        <FaExpand size={13} className="text-slate-300 group-hover:text-red-400 transition-colors shrink-0" />
                      </button>
                    )}

                    {/* GitHub link — unchanged */}
                    {currentVideo?.git_link && (
                      <a href={currentVideo.git_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-gray-100 transition-all border border-slate-100">
                        <div className="flex items-center gap-3"><FaGithub className="text-slate-800" size={20} /><span className="block text-sm font-bold text-slate-700">Get Source Code</span></div>
                        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center"><FaGithub size={14} className="text-slate-700" /></div>
                      </a>
                    )}

                    {/* Image — unchanged */}
                    {currentVideo?.image_path && (
                      <a href={currentVideo.image_path} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-all">
                        <div className="flex items-center gap-3"><FaImage className="text-indigo-500" size={20} /><span className="text-sm font-bold text-slate-700">Infographic</span></div>
                        <FaImage size={14} className="text-indigo-500" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Meeting Request Button - Mobile View */}
              <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 lg:hidden">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FaComments size={14} /> Meeting &amp; Support</h3>
                {realCoursePercent >= 80 ? (
                  <button
                    onClick={() => setShowMeetModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    <FaComments size={16} /> Request 1:1 Meeting
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-600 py-3 px-2 rounded-xl font-medium cursor-not-allowed"
                  >
                    <FaLock size={14} /> Watch 80% Videos to Unlock Meeting
                  </button>
                )}
                <button
                  onClick={() => setShowDiscussionModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold transition-all mt-3"
                >
                  <FaComments size={16} /> Start Discussion
                </button>
              </div>
            </div>

            <div className={`${activeTab === "resources" ? "block" : "hidden md:block"} mb-10`}>
              {currentAssignment ? (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{currentAssignment.title}</h3>
                          <p className="text-sm text-slate-500">{currentAssignment.questions?.length || 0} Questions | {currentAssignment.totalMarks || 0} Marks</p>
                        </div>
                      </div>
                      <button onClick={() => toggleAssignment(currentAssignment._id)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                        {expandedAssignmentId === currentAssignment._id ? (
                          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>Collapse Assignment</>
                        ) : (
                          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>Start Assignment</>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className={`transition-all duration-300 ease-in-out ${expandedAssignmentId === currentAssignment._id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <div className="border-t border-indigo-200 bg-white">
                      <AssignmentComponent key={currentAssignment._id} courseId={id} videoId={currentVideo?._id} assignment={currentAssignment} onClose={() => setExpandedAssignmentId(null)} isInline={true} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-gray-500 font-medium">No assignment for this lesson</p>
                  </div>
                </div>
              )}
            </div>

            <div className={`${activeTab === "lessons" ? "block" : "hidden"} lg:hidden mb-10`}>
              <LessonList />
            </div>
          </div>
        </main>

        {/* Sidebar - Desktop View */}
        <aside className="hidden lg:flex flex-col w-[400px] border-l border-slate-200 bg-white h-screen sticky top-0">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-slate-800">Course Content</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">{realCompletedVideos}/{realTotalVideos}</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${durationProgressPercent}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-500">{completedDurationFormatted} watched</span>
              <span className="text-[10px] text-slate-500">{totalDurationFormatted} total</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <LessonList />
          </div>

          {/* Meeting & Discussion Buttons - Desktop View */}
          <div className="p-4 border-t border-slate-200 space-y-2">
            {realCoursePercent >= 80 ? (
              <button onClick={() => setShowMeetModal(true)} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                <FaComments size={16} /> Request 1:1 Meeting
              </button>
            ) : (
              <button disabled className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-600 py-3 rounded-xl font-semibold cursor-not-allowed">
                <FaLock size={14} /> Complete atleast 80% to Unlock Meeting
              </button>
            )}
            <button onClick={() => setShowDiscussionModal(true)} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold transition-all">
              <FaComments size={16} /> Start Discussion
            </button>
          </div>
        </aside>
      </div>

      {/* Modals */}
      {showMeetModal && <MeetingRequest courseId={id} onClose={() => setShowMeetModal(false)} />}
      {showDiscussionModal && <CreateDiscussionModal courseId={id} onClose={() => setShowDiscussionModal(false)} />}


      {/* ✅ PDF Viewer Modal */}
      {showPdfModal && currentVideo?.pdf_path && (
        <PDFViewerModal
          videoId={currentVideo._id}
          contentId={currentModule?._id} // ✅ Use currentModule instead
          pdfUrl={currentVideo.pdf_path}
          title={currentVideo.video_title ? `${currentVideo.video_title} — PDF` : "Lecture PDF"}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </UserLayout>
  );
};

export default VideoCoursePlayer;
