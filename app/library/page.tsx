// app/library/page.tsx
import Link from "next/link";
import { fetchManifest } from "@/lib/manifest";
import TrackGrid from "@/components/trackGrid";

// have to Rebuilds this page at most once an hour so new catalog uploads show up
// without needing a redeploy.
export const revalidate = 3600;

export const metadata = {
  title: "Library — Audio Visualiser",
};

export default async function LibraryPage() {
  const tracks = await fetchManifest();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Library</h1>
          <Link
            href="/home"
            className="text-sm underline opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 rounded"
          >
            Back to visualiser
          </Link>
        </div>
        {tracks.length === 0 ? (
          <p className="opacity-70">
            No tracks in the catalog yet. Add entries to the CDN manifest to see them here.
          </p>
        ) : (
          <TrackGrid tracks={tracks} />
        )}
      </div>
    </div>
  );
}
