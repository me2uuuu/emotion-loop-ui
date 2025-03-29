gsap.registerPlugin(MotionPathPlugin);

const emotionTypes = [
  { name: "INTUNE", description: "당신은 내면의 주파수에 조율된 감각형 인간입니다." },
  { name: "VISUALIZER", description: "당신은 시각 정보를 통해 세계를 인식하는 감각형 인간입니다." },
  { name: "SOUNDDRIFTER", description: "소리의 흐름에 따라 감정을 떠올리는 공감각자입니다." },
  { name: "TACTILE SEEKER", description: "촉각을 통해 현실을 느끼고 감정을 읽어내는 타입입니다." }
];

window.onload = () => {
  document.body.addEventListener('click', () => {
    const audio = document.getElementById("bgm");
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play();
    }
  }, { once: true });

  const log = document.getElementById("systemLog");
  const logMessages = [
    "[LOG] 입자 진입 확인...",
    "[LOG] 노드 1 분석 중...",
    "[LOG] 감정 반복 패턴 감지됨...",
    "[LOG] 불안정 노드 접근 중...",
    "[LOG] 감정 코드 리추얼 진행 중..."
  ];

  let logIndex = 0;
  const logInterval = setInterval(() => {
    if (logIndex < logMessages.length) {
      log.textContent = logMessages[logIndex];
      logIndex++;
    } else {
      clearInterval(logInterval);
    }
  }, 1600);

  function revealCard(cardId) {
    gsap.to(`#${cardId}`, {
      display: 'block',
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    });
  }

  gsap.to("#particle", {
    duration: 8,
    repeat: 0,
    ease: "power1.inOut",
    motionPath: {
      path: "#emotionPath",
      align: "#emotionPath",
      autoRotate: true
    },
    onUpdate: function () {
      const particle = document.querySelector("#particle");
      const rect = particle.getBoundingClientRect();
      const secretZoneX = window.innerWidth * 0.7;
      const secretZoneY = window.innerHeight * 0.75;
      const range = 30;

      if (!window.secretChecked && Math.abs(rect.x - secretZoneX) < range && Math.abs(rect.y - secretZoneY) < range) {
        window.secretChecked = true;
        if (Math.random() < 0.15) {
          revealCard("secretCard");
          window.secretRevealed = true;
          log.textContent = "[LOG] 비밀 카드 출력됨 :: [SECRET CARD - ??]";
        } else {
          log.textContent = "[LOG] 불안정 노드 통과 :: 비밀 카드 없음";
        }
      }
    },
    onComplete: () => {
      if (!window.secretRevealed) {
        revealCard("finalCard");
        log.textContent = "[LOG] 리추얼 완료 :: [ECLIPSED CORE] 출력";
      }
    }
  });

  document.getElementById("finalCard").addEventListener("click", () => {
    const desc = document.getElementById("cardDescription");
    const systemLog = document.getElementById("systemLog");

    const randomIndex = Math.floor(Math.random() * emotionTypes.length);
    const selected = emotionTypes[randomIndex];

    console.log("💡 카드 클릭됨:", selected.name);

    document.getElementById("finalCard").textContent = `[${selected.name}]`;
    desc.innerHTML = selected.description;
    desc.style.visibility = "visible";

    gsap.set(desc, { opacity: 0, y: 10 });
    gsap.to(desc, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });

    systemLog.textContent = `[SYSTEM LOG] 감정 코드 [${selected.name}] 리추얼 실행됨...`;
  });
};
