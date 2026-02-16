import { jsx as _jsx } from "react/jsx-runtime";
export default function EmbedViewer({ url, contentType, title }) {
    const getEmbedUrl = (originalUrl, type) => {
        // YouTube URLs
        if (originalUrl.includes("youtube.com/watch")) {
            const videoId = new URL(originalUrl).searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (originalUrl.includes("youtu.be/")) {
            const videoId = originalUrl.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // Vimeo URLs
        if (originalUrl.includes("vimeo.com/")) {
            const videoId = originalUrl.split("vimeo.com/")[1].split("?")[0];
            return `https://player.vimeo.com/video/${videoId}`;
        }
        // Google Slides URLs
        if (originalUrl.includes("docs.google.com/presentation")) {
            // Convert /edit to /embed
            if (originalUrl.includes("/edit")) {
                return originalUrl.replace("/edit", "/embed");
            }
            // Convert /pub to /embed to ensure proper iframe embedding
            if (originalUrl.includes("/pub")) {
                return originalUrl.replace("/pub", "/embed");
            }
            // Add /embed if not present
            return `${originalUrl}/embed`;
        }
        // Google Drive file URLs
        if (originalUrl.includes("drive.google.com/file")) {
            const fileId = originalUrl.match(/\/d\/([^/]+)/)?.[1];
            if (fileId) {
                if (type === "video") {
                    return `https://drive.google.com/file/d/${fileId}/preview`;
                }
                if (type === "pdf") {
                    return `https://drive.google.com/file/d/${fileId}/preview`;
                }
                if (type === "presentation") {
                    return `https://docs.google.com/presentation/d/${fileId}/embed`;
                }
            }
        }
        // PDF URLs - wrap in Google Docs Viewer for better compatibility
        if (type === "pdf" && (originalUrl.endsWith(".pdf") || originalUrl.includes("pdf"))) {
            return `https://docs.google.com/viewer?url=${encodeURIComponent(originalUrl)}&embedded=true`;
        }
        // PowerPoint Online / Office 365
        if (originalUrl.includes("1drv.ms") || originalUrl.includes("sharepoint.com")) {
            return originalUrl;
        }
        // Default: return as-is for direct embeds
        return originalUrl;
    };
    const embedUrl = getEmbedUrl(url, contentType);
    // Aspect ratio based on content type
    const getAspectRatio = () => {
        if (contentType === "video")
            return "56.25%"; // 16:9
        if (contentType === "presentation")
            return "75%"; // 4:3
        if (contentType === "pdf")
            return "141.42%"; // A4 ratio (1:1.414)
        return "56.25%";
    };
    return (_jsx("div", { className: "w-full", children: _jsx("div", { className: "relative w-full overflow-hidden rounded-lg border border-border shadow-sm", style: { paddingBottom: getAspectRatio() }, children: _jsx("iframe", { src: embedUrl, title: title, className: "absolute top-0 left-0 w-full h-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, loading: "lazy", sandbox: "allow-scripts allow-same-origin allow-presentation allow-forms" }) }) }));
}
