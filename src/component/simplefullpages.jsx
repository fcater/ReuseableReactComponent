import React, { useEffect, useState } from "react";

const SimpleFullPages = ({
  size = 3,
  speed = 1000,
  mouse = 1000,
  drag = 500,
  draggingDistance = 30,
  nav = true,
  children,
}) => {
  let [page, setPage] = useState(1);
  let [timer, setTimer] = useState(null);
  const [pages, setPages] = useState([]);
  const [top, setTop] = useState(0);
  const [pageSize] = useState(size);
  const [mouseY, setMouseY] = useState(0);
  const [mobileTochY, setMobileTochY] = useState(0);

  useEffect(() => {
    setTop(-window.innerHeight * (page - 1));
  }, [page]);

  useEffect(() => {
    const pageList = [];
    for (let i = 1; i <= pageSize; i++) {
      pageList.push(i);
    }
    setPages(pageList);
  }, [pageSize]);

  //翻页逻辑
  const goUp = () => {
    page -= 1;
    page = tochTop(page, pageSize);
    setPage(page);
  };
  const goDown = () => {
    page += 1;
    page = tochBotom(page, pageSize);
    setPage(page);
  };
  //边缘检测
  const tochTop = (page, pageSize) => {
    return page <= 0 ? (page = pageSize) : page;
  };
  const tochBotom = (page, pageSize) => {
    return page >= pageSize + 1 ? (page = 1) : page;
  };

  //节流
  function throttle(fn, wait) {
    return function () {
      if (!timer) {
        fn.apply(this, Array.prototype.slice.call(arguments, 0));
        setTimer(setTimeout(() => setTimer(null), wait));
      }
    };
  }

  //滚轮切页 节流1s
  const scroolMouse = (e) => {
    if (e.deltaY < 0) return goUp();
    if (e.deltaY > 0) return goDown();
  };

  //圆点切页 无节流
  const handlePageChange = (page) => {
    setPage(page);
  };

  // 拖拽切页 节流0.5s
  const handleMouseDown = (e) => {
    setMouseY(e.clientY);
  };
  const handleMouseUp = (e) => {
    if (e.clientY < mouseY && Math.abs(e.clientY - mouseY) > draggingDistance)
      return goDown();
    if (e.clientY > mouseY && Math.abs(e.clientY - mouseY) > draggingDistance)
      return goUp();
  };

  //移动端操作
  const handleTouchStart = (e) => {
    setMobileTochY(e.changedTouches[0].screenY);
  };
  const handleTouchEnd = (e) => {
    if (
      mobileTochY < e.changedTouches[0].screenY &&
      Math.abs(mobileTochY - e.changedTouches[0].screenY) > draggingDistance
    )
      return goUp();
    if (
      mobileTochY > e.changedTouches[0].screenY &&
      Math.abs(mobileTochY - e.changedTouches[0].screenY) > draggingDistance
    )
      return goDown();
  };

  return (
    <div
      onWheel={mouse && throttle(scroolMouse, mouse)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ overflow: "hidden", height: "100vh" }}
    >
      <div
        className="box"
        style={{
          width: "100vw",
          marginTop: `${top}px`,
          transition: `all ${speed / 1000}s`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={drag && throttle(handleMouseUp, drag)}
      >
        {children &&
          (children.length > 1
            ? children.map((element) => (
                <div
                  draggable="false"
                  style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={children.indexOf(element)}
                >
                  {element}
                </div>
              ))
            : children)}
      </div>

      {nav && (
        <nav
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {pages.map((p) => (
            <p
              key={p}
              style={page === p ? {} : { cursor: "pointer" }}
              onClick={() => handlePageChange(p)}
            >
              {page === p ? "◉" : "●"}
            </p>
          ))}
        </nav>
      )}
    </div>
  );
};

export default SimpleFullPages;
