export default {
    // 获取窗口可视范围的高度
    getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    },

    // 获取窗口可视范围宽度
    getPageViewWidth() {
        let d = document,
            a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
        return a.clientWidth;
    },

    // 获取窗口宽度
    getPageWidth() {
        let g = document,
            a = g.body,
            f = g.documentElement,
            d = g.compatMode == "BackCompat" ? a : g.documentElement;
        return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
    },
    // 获取窗口尺寸
    getViewportOffset() {
        if (window.innerWidth) {
            return {
                w: window.innerWidth,
                h: window.innerHeight
            }
        } else {
            // ie8及其以下
            if (document.compatMode === "BackCompat") {
                // 怪异模式
                return {
                    w: document.body.clientWidth,
                    h: document.body.clientHeight
                }
            } else {
                // 标准模式
                return {
                    w: document.documentElement.clientWidth,
                    h: document.documentElement.clientHeight
                }
            }
        }
    },
    // 获取滚动条距顶部高度
    getPageScrollTop() {
        let a = document;
        return a.documentElement.scrollTop || a.body.scrollTop;
    },
    // 返回当前滚动条位置
    getScrollPosition = (el = window) => ({
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
    }),
    // 滚动到指定元素区域
    smoothScroll = element => {
        document.querySelector(element).scrollIntoView({
            behavior: 'smooth'
        });
    },
    // 平滑滚动到页面顶部
    scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    },

}