/**
 * Hero Canvas Animation – Atmospheric farm scene
 * Plays once over ~5 seconds, then holds final frame.
 */
(function () {
  const video = document.getElementById('heroVideo');
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // If video loads successfully, hide canvas and skip animation
  if (video) {
    // Slow down playback (0.5 = half speed)
    video.playbackRate = 0.5;

    // Wait until enough data is buffered before showing
    video.addEventListener('canplaythrough', function () {
      canvas.style.display = 'none';
      video.playbackRate = 0.5;
    });

    // Stop on last frame after first play
    video.addEventListener('ended', function () {
      video.pause();
    });

    video.addEventListener('error', function () {
      video.style.display = 'none';
      canvas.style.display = 'block';
    });
  }
  const ctx = canvas.getContext('2d');

  let w, h, dpr;
  const DURATION = 5000; // 5 seconds
  let startTime = null;
  let stopped = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.parentElement.offsetWidth;
    h = canvas.parentElement.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', () => {
    resize();
    if (stopped) drawFrame(1);
  });
  resize();

  // Colors
  const SKY_TOP_START = { r: 15, g: 32, b: 25 };
  const SKY_TOP_END = { r: 45, g: 85, b: 65 };
  const SKY_BOT_START = { r: 25, g: 50, b: 38 };
  const SKY_BOT_END = { r: 80, g: 140, b: 100 };

  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpColor(c1, c2, t) {
    return `rgb(${Math.round(lerp(c1.r, c2.r, t))},${Math.round(lerp(c1.g, c2.g, t))},${Math.round(lerp(c1.b, c2.b, t))})`;
  }

  // Hill definitions (layers back to front)
  const hills = [
    { yBase: 0.58, amplitude: 0.04, freq: 0.8, speed: 0.1, color1: { r: 30, g: 60, b: 42 }, color2: { r: 50, g: 95, b: 68 } },
    { yBase: 0.64, amplitude: 0.05, freq: 1.2, speed: 0.15, color1: { r: 35, g: 72, b: 50 }, color2: { r: 60, g: 110, b: 78 } },
    { yBase: 0.72, amplitude: 0.035, freq: 1.8, speed: 0.2, color1: { r: 40, g: 82, b: 55 }, color2: { r: 70, g: 125, b: 85 } },
    { yBase: 0.82, amplitude: 0.025, freq: 2.5, speed: 0.25, color1: { r: 48, g: 95, b: 62 }, color2: { r: 82, g: 145, b: 95 } },
  ];

  // Particles (dust / light motes)
  const particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random(),
      y: 0.3 + Math.random() * 0.5,
      size: 1 + Math.random() * 2.5,
      speed: 0.02 + Math.random() * 0.04,
      drift: (Math.random() - 0.5) * 0.01,
      opacity: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
    });
  }

  // Stars
  const stars = [];
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() * 0.5,
      size: 0.5 + Math.random() * 1.5,
      twinkle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 2,
    });
  }

  function drawHill(hill, t, progress) {
    const shift = hill.speed * progress;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      const nx = x / w;
      const y = h * hill.yBase
        + Math.sin((nx * hill.freq + shift) * Math.PI * 2) * h * hill.amplitude
        + Math.sin((nx * hill.freq * 1.7 + shift * 0.7) * Math.PI * 2) * h * hill.amplitude * 0.4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = lerpColor(hill.color1, hill.color2, progress);
    ctx.fill();
  }

  function drawBarn(progress) {
    const fade = Math.min(1, progress * 2);
    ctx.save();
    ctx.globalAlpha = fade * 0.6;

    const bx = w * 0.72;
    const by = h * 0.56;
    const bw = w * 0.08;
    const bh = bw * 0.7;

    // Main body
    ctx.fillStyle = '#1a3a28';
    ctx.fillRect(bx, by - bh, bw, bh);

    // Roof
    ctx.beginPath();
    ctx.moveTo(bx - bw * 0.1, by - bh);
    ctx.lineTo(bx + bw * 0.5, by - bh - bw * 0.45);
    ctx.lineTo(bx + bw * 1.1, by - bh);
    ctx.closePath();
    ctx.fillStyle = '#142e20';
    ctx.fill();

    // Silo
    const sx = bx + bw * 1.05;
    const sh = bh * 1.2;
    const sr = bw * 0.18;
    ctx.fillStyle = '#1a3a28';
    ctx.fillRect(sx, by - sh, sr * 2, sh);
    ctx.beginPath();
    ctx.arc(sx + sr, by - sh, sr, 0, Math.PI, true);
    ctx.fill();

    // Door
    ctx.fillStyle = '#0f2219';
    const dw = bw * 0.25;
    const dh = bh * 0.45;
    ctx.fillRect(bx + bw * 0.38, by - dh, dw, dh);

    // Window glow
    if (progress > 0.3) {
      const glow = Math.min(1, (progress - 0.3) / 0.3);
      ctx.fillStyle = `rgba(233, 196, 106, ${glow * 0.7})`;
      const wx = bx + bw * 0.15;
      const wy = by - bh * 0.7;
      const ws = bw * 0.15;
      ctx.fillRect(wx, wy, ws, ws);

      // Glow effect
      const grad = ctx.createRadialGradient(wx + ws / 2, wy + ws / 2, ws * 0.2, wx + ws / 2, wy + ws / 2, ws * 3);
      grad.addColorStop(0, `rgba(233, 196, 106, ${glow * 0.15})`);
      grad.addColorStop(1, 'rgba(233, 196, 106, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(wx - ws * 2, wy - ws * 2, ws * 5, ws * 5);
    }

    ctx.restore();
  }

  function drawSun(progress) {
    // Rising sun/moon glow behind hills
    const sunProgress = Math.max(0, (progress - 0.1) / 0.9);
    const sunX = w * 0.3;
    const sunY = h * lerp(0.65, 0.42, sunProgress);
    const sunRadius = w * 0.12;

    const grad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    grad.addColorStop(0, `rgba(233, 196, 106, ${sunProgress * 0.35})`);
    grad.addColorStop(0.4, `rgba(212, 163, 115, ${sunProgress * 0.15})`);
    grad.addColorStop(1, 'rgba(212, 163, 115, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Sun disc
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(233, 196, 106, ${sunProgress * 0.6})`;
    ctx.fill();
  }

  function drawFrame(progress) {
    // Ease progress
    const t = 1 - Math.pow(1 - progress, 2);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    skyGrad.addColorStop(0, lerpColor(SKY_TOP_START, SKY_TOP_END, t));
    skyGrad.addColorStop(1, lerpColor(SKY_BOT_START, SKY_BOT_END, t));
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Stars (fade out as dawn comes)
    const starAlpha = Math.max(0, 1 - t * 1.5);
    if (starAlpha > 0) {
      stars.forEach(star => {
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinkle + progress * star.speed * 10);
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha * twinkle * 0.6})`;
        ctx.fill();
      });
    }

    // Sun glow
    drawSun(t);

    // Hills (back to front)
    hills.forEach(hill => drawHill(hill, t, t));

    // Barn
    drawBarn(t);

    // Ground
    const groundGrad = ctx.createLinearGradient(0, h * 0.88, 0, h);
    groundGrad.addColorStop(0, lerpColor({ r: 48, g: 95, b: 62 }, { r: 82, g: 145, b: 95 }, t));
    groundGrad.addColorStop(1, lerpColor({ r: 30, g: 65, b: 42 }, { r: 55, g: 105, b: 70 }, t));
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h * 0.88, w, h * 0.12);

    // Fence on ground
    if (t > 0.2) {
      const fenceAlpha = Math.min(1, (t - 0.2) / 0.3) * 0.3;
      ctx.strokeStyle = `rgba(30, 55, 38, ${fenceAlpha})`;
      ctx.lineWidth = 1.5;
      const fy = h * 0.86;
      const fenceSpacing = w * 0.04;
      for (let fx = w * 0.05; fx < w * 0.45; fx += fenceSpacing) {
        // Post
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx, fy - h * 0.035);
        ctx.stroke();
      }
      // Rails
      ctx.beginPath();
      ctx.moveTo(w * 0.05, fy - h * 0.012);
      ctx.lineTo(w * 0.45, fy - h * 0.012);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w * 0.05, fy - h * 0.028);
      ctx.lineTo(w * 0.45, fy - h * 0.028);
      ctx.stroke();
    }

    // Particles
    particles.forEach(p => {
      const px = ((p.x + p.drift * progress * 20) % 1.1) * w;
      const py = p.y * h + Math.sin(p.phase + progress * 4) * h * 0.015;
      const alpha = p.opacity * t * (0.6 + 0.4 * Math.sin(p.phase + progress * 3));
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233, 210, 160, ${alpha})`;
      ctx.fill();
    });

    // Vignette
    const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.9);
    vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vigGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / DURATION);

    drawFrame(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      stopped = true;
    }
  }

  requestAnimationFrame(animate);
})();
