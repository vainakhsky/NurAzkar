font-size: 14px;
  line-height: 1.5;
}

.feature-icon {
  font-size: 24px;
}

.install-card {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.install-title {
  font-size: 17px;
  font-weight: 800;
}

.install-text {
  color: var(--muted);
  font-size: 14px;
  margin-top: 4px;
}

.azkar-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.azkar-card {
  padding: 18px;
}

.card-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.repeat-badge {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: rgba(200, 164, 107, 0.16);
  color: var(--gold-dark);
}

.arabic-text {
  direction: rtl;
  font-size: 31px;
  line-height: 1.9;
  font-weight: 700;
  text-align: right;
  margin-bottom: 16px;
}

.transcription-text {
  font-size: 16px;
  line-height: 1.7;
  color: var(--gold-dark);
  margin-bottom: 12px;
}

.translation-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
  margin-bottom: 20px;
}

.tasbih-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.tasbih-progress {
  position: relative;
  width: 120px;
  height: 120px;
  flex: 0 0 120px;
}

.progress-ring {
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
}

.ring-bg,
.ring-fill {
  fill: none;
  stroke-width: 8;
}

.ring-bg {
  stroke: var(--ring-bg);
}

.ring-fill {
  stroke: var(--ring-fill);
  stroke-linecap: round;
  stroke-dasharray: 326.72;
  stroke-dashoffset: 326.72;
  transition: stroke-dashoffset 0.25s ease;
}

.progress-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.count-value {
  font-size: 28px;
  font-weight: 800;
}

.count-total {
  font-size: 14px;
  color: var(--muted);
}

.tasbih-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.count-btn {
  min-width: 88px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow);
}

.plus-btn {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
  color: white;
  border: none;
}

.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  width: min(720px, calc(100% - 24px));
  background: var(--nav);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-around;
  padding: 10px 8px;
  backdrop-filter: blur(14px);
  z-index: 80;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
  min-width: 88px;
}

.nav-item.active {
  color: var(--gold-dark);
}

.fade-in {
  animation: fadeInUp 0.45s ease both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .hero-card h1 {
    font-size: 28px;
  }

  .arabic-text {
    font-size: 26px;
  }

  .tasbih-box {
    flex-direction: column;
    align-items: center;
  }

  .tasbih-actions {
    justify-content: center;
  }
}
