(() => {
  // 1. 화면 공유 제어 자동 클릭
  const clickedSet = new Set();

  const clickControl = (el) => {
    const control = el.querySelector(".PlayerVideo_control__SXCXe");
    if (control) {
      control.click();
      clickedSet.add(el);
    }
  };

  const handleScreenShare = () => {
    document
      .querySelectorAll("div.RtcPlayerVideo_video__dAluv:not([data-is-me])")
      .forEach((el) => {
        if (!clickedSet.has(el)) clickControl(el);
      });
  };

  handleScreenShare();

  const observer = new MutationObserver(handleScreenShare);
  observer.observe(document.body, { childList: true, subtree: true });

  // 2. 매 정각 50분마다 비디오 버튼 자동 클릭
  const clickVideoButton = () => {
    const target = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.querySelector('svg[data-sentry-component="VideoFillIcon"]')
    );
    if (target) target.click();
  };

  const scheduleVideoButtonClick = () => {
    const now = new Date();
    const next = new Date(now);
    next.setMinutes(50, 0, 0);
    if (now.getMinutes() >= 50) next.setHours(now.getHours() + 1);

    setTimeout(() => {
      clickVideoButton();
      scheduleVideoButtonClick();
    }, next.getTime() - now.getTime());
  };

  scheduleVideoButtonClick();
})();
