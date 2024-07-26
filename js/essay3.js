// essay3.js
function openImage(img) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    let modalImg = document.createElement('img');
    modalImg.classList.add('modal-img');
    modalImg.src = img.src;
    modalImg.style.maxWidth = '80%';
    modalImg.style.maxHeight = '80%';
  
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
  
    // 添加动画
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    modal.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
  
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 10);
  
    // 放大区域
    let zoomArea = null;
  
    // 判断是否是第一张图片
    if (img.classList.contains('first-img')) {
      // 鼠标悬停放大区域 (仅针对第一张图片)
      modalImg.addEventListener('mousemove', (event) => {
        const areaSize = 150; // 放大区域边长
  
        // 使用 pageX 和 pageY 获取相对于文档的坐标
        let x = event.pageX - areaSize / 2;
        let y = event.pageY - areaSize / 2;
  
        if (zoomArea) {
          // 更新放大区域位置
          zoomArea.style.top = `${y}px`;
          zoomArea.style.left = `${x}px`;
  
          // 更新 zoomArea 的背景定位，实现放大效果
          zoomArea.style.backgroundPosition = `-${event.offsetX * 2}px -${event.offsetY * 2}px`;
        } else {
          // 创建放大区域
          zoomArea = document.createElement('div');
          zoomArea.classList.add('zoom-area');
          zoomArea.style.width = `${areaSize}px`;
          zoomArea.style.height = `${areaSize}px`;
          zoomArea.style.position = 'absolute';
          zoomArea.style.top = `${y}px`;
          zoomArea.style.left = `${x}px`;
          zoomArea.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          zoomArea.style.pointerEvents = 'none';
          zoomArea.style.overflow = 'hidden';
          // 设置放大镜背景图片
          zoomArea.style.backgroundImage = `url(${img.src})`;
          zoomArea.style.backgroundSize = `${modalImg.offsetWidth * 2}px ${modalImg.offsetHeight * 2}px`;
          zoomArea.style.backgroundRepeat = 'no-repeat';
          // 初始化背景定位
          zoomArea.style.backgroundPosition = `-${event.offsetX * 2}px -${event.offsetY * 2}px`;
          modal.appendChild(zoomArea);
        }
      });
  
      // 鼠标移出放大区域 (仅针对第一张图片)
      modalImg.addEventListener('mouseout', () => {
        if (zoomArea) {
          zoomArea.remove();
          zoomArea = null;
        }
      });
  
    } else {
      // 其他图片保留点击放大的效果，无需添加鼠标事件
    }
  
    // 点击关闭 (所有图片)
    modal.addEventListener('click', () => {
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.8)';
  
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
  }