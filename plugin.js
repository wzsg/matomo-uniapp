import sha1 from 'js-sha1'

const Matomo = {
    install(Vue, options) {
        const pluginName = "MatomoUniApp";
        const pluginVersion = "v1.0.3";
        if (uni===undefined || !uni) {
            console.log(`${pluginName} ${pluginVersion} install fail - Not in UniApp`)
            return
        }

        this.matomoUrl = options.url;
        this.matomoSiteId = options.siteId;

        this.navigateTo = uni.navigateTo;
        this.redirectTo = uni.redirectTo;
        this.reLaunch = uni.reLaunch;
        this.switchTab = uni.switchTab;

        const _this = this;
        //唯一访客 ID，必须是 16 个字符的十六进制字符串
        this.userId = null;
        this.resolution = null;
        uni.getSystemInfo({
            success: function (res) {
                console.log("getSystemInfo 2")
                _this.userId = sha1(res.deviceId).substring(0, 16);
                // 获取设备的分辨率
                _this.resolution = res.windowWidth + 'x' + res.windowHeight;
            }
        });

        this.uid = null;
        // #ifndef VUE3  vue2
        Vue.prototype.$setUid = function (uid) {
            _this.uid = uid;
        }
		// #endif
		// #ifdef VUE3  vue3
		Vue.config.globalProperties.$setUid = uid => {
            _this.uid = uid;
		}
		// #endif

        this.trackPageView = (options) => {
            //console.log("MatomoPlugin trackPageView", options)
            const postData = {
                idsite: this.matomoSiteId,
                rec: 1,
                action_name: options.actionName,
                url: "app://uniapp"+options.pageUrl,
                apiv: 1
            }
            postData.rand = Math.floor(Math.random() * 100000);
            let now = new Date(); // 创建一个Date对象，表示当前时间
            let hour = now.getHours(); // 获取当前小时
            let minute = now.getMinutes(); // 获取当前分钟
            let second = now.getSeconds(); // 获取当前秒数
            postData.h = hour;
            postData.m = minute;
            postData.s = second;
            if(this.userId!==null){
                postData._id = this.userId;
            }
            if(this.resolution!==null){
                postData.res = this.resolution;
            }
            if(this.uid!==null){
                postData.uid = this.uid;
            }
            console.log(postData)
            uni.request({
                url: this.matomoUrl + "/matomo.php",
                data: postData,
                method: 'GET',
                success: (res) => {

                },
                fail: (res) => {

                }
            });
        }

        uni.navigateTo = (options) => {
            this.trackPageView({
                actionName: "navigateTo",
                pageUrl: options.url
            });
            this.navigateTo(options);
        }
        uni.redirectTo = (options) => {
            this.trackPageView({
                actionName: "redirectTo",
                pageUrl: options.url
            });
            this.redirectTo(options);
        }
        uni.reLaunch = (options) => {
            this.trackPageView({
                actionName: "reLaunch",
                pageUrl: options.url
            });
            this.reLaunch(options);
        }
        uni.switchTab = (options) => {
            this.trackPageView({
                actionName: "switchTab",
                pageUrl: options.url
            });
            this.switchTab(options);
        }
        console.log(`${pluginName} ${pluginVersion} install success`)
    }
}

export default Matomo;