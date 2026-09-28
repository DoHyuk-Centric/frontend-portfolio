import styles from "./home.module.css";

/**
 * The exact background scene approved in the design mockup: layered SVG
 * ridge silhouettes plus a moon, all inside one tall "world" that the page
 * scroll pans through (see `.scene` in home.module.css). No Three.js here —
 * this is the faithful CSS/SVG version to build back up from.
 */
export function MountainScene() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #121217 0%, #0B0B0E 45%, #08080A 100%)",
      }}
    >
      <div
        className={styles.scene}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: "155vh" }}
      >
        {/* the moon: sits near the top of the scene, in the sky above the peak */}
        <div
          style={{
            position: "absolute",
            top: "24%",
            left: "61%",
            width: 68,
            height: 68,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 34% 32%, #FAF9F5 0%, #E3DACC 55%, #B0AEA5 100%)",
            boxShadow:
              "0 0 46px rgba(250,249,245,0.22), 0 0 110px rgba(250,249,245,0.1)",
          }}
        />

        {/* the mountain group: anchored to the bottom of the scene, exactly one viewport tall */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "100vh" }}>
          {/* layer 1 — farthest, soft rolling ridgeline */}
          <svg
            className={styles.ridge1}
            viewBox="0 0 1440 640"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", inset: "-2% 0 0 0", width: "100%", height: "104%" }}
          >
            <path
              d="M0,500 Q60,472 120,488 T240,478 Q300,454 360,472 T480,462 Q540,442 600,466 T720,456 Q780,438 840,462 T960,452 Q1020,434 1080,458 T1200,448 Q1260,430 1320,454 T1440,444 L1440,640 L0,640 Z"
              fill="#26262B"
            />
          </svg>

          {/* layer 2 — far ridge, small irregular peaks */}
          <svg
            className={styles.ridge2}
            viewBox="0 0 1440 640"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", inset: "-2% 0 0 0", width: "100%", height: "104%" }}
          >
            <path
              d="M0,480 L95,430 L175,460 L255,415 L335,450 L420,400 L505,445 L590,410 L680,452 L775,405 L865,448 L955,412 L1045,450 L1135,415 L1225,448 L1330,418 L1440,445 L1440,640 L0,640 Z"
              fill="#1B1B1F"
            />
          </svg>

          {/* layer 3 — hills flanking the summit, so it rises out of a ridge rather than floating alone */}
          <svg
            className={styles.ridge3}
            viewBox="0 0 1440 640"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", inset: "-2% 0 0 0", width: "100%", height: "104%" }}
          >
            <path
              d="M0,520 L120,470 L220,500 L320,455 L420,485 L520,440 L600,405 L660,430 L710,400 L900,430 L980,460 L1070,420 L1160,455 L1260,415 L1350,450 L1440,425 L1440,640 L0,640 Z"
              fill="#121216"
            />
          </svg>

          {/* layer 4 — the summit: one tall, asymmetric peak (long ridge left, steep face right) */}
          <svg
            className={styles.ridge4}
            viewBox="0 0 1440 640"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", inset: "-2% 0 0 0", width: "100%", height: "104%" }}
          >
            <path
              d="M0,470 L160,435 L320,455 L420,400 L500,360 L570,305 L630,255 L680,200 L725,160 L765,130 L800,118 L840,140 L880,185 L915,240 L950,300 L990,355 L1050,395 L1140,415 L1250,400 L1350,420 L1440,405 L1440,640 L0,640 Z"
              fill="#0B0B0E"
            />
            {/* faint moonlit facet near the summit — still fully neutral gray */}
            <path
              d="M680,200 L765,130 L800,118 L840,140 L790,178 Z"
              fill="rgba(250,249,245,0.045)"
            />
          </svg>

          {/* layer 5 — nearest: a soft, rounded foreground slope crossing in front of the summit's base */}
          <svg
            className={styles.ridge5}
            viewBox="0 0 1440 640"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", inset: "-2% 0 0 0", width: "100%", height: "104%" }}
          >
            <path
              d="M0,640 L0,560 Q160,500 340,522 Q500,542 640,505 Q780,472 920,508 Q1080,548 1250,528 Q1360,516 1440,534 L1440,640 Z"
              fill="#050506"
              stroke="rgba(250,249,245,0.05)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
