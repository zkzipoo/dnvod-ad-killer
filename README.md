# Dnvod Ad Killer

[![GitHub tag](https://img.shields.io/github/tag/GreatYYX/dnvod-ad-killer.svg)](https://github.com/GreatYYX/dnvod-ad-killer/releases) [![Firefox addon](https://img.shields.io/badge/firefox-addon-orange.svg?logo=mozilla%20firefox)](https://github.com/GreatYYX/dnvod-ad-killer/tree/master/firefox-extension/dist)

[鉴于多瑙基本就是海外的国人在使用，这儿就不写英文了]

移除多瑙(dnvod.tv)的视频广告及等待时间。

# 实现思路

请移步我的blog：[http://blog.yyx.me/posts/dnvod-ad-killer-v2](http://blog.yyx.me/posts/dnvod-ad-killer-v2)

# 使用方法

目前提供两种方案，二选一即可。

## Firefox插件

由于dnvod的js经过混淆和压缩，修改后的js依然无法通过Firefox Add-ons的审核要求，因此self host在[这里](https://github.com/GreatYYX/dnvod-ad-killer/tree/master/firefox-extension/dist)。选择相应版本，点击download，下载后拖拽到浏览器即可。

插件已经通过官方签名且支持自动升级。

> Chrome由于对Extension API的限制，该思路无法使用插件实现。请使用MITM脚本。

## MITM脚本

1. 本脚本基于[mitmproxy](https://mitmproxy.org/)实现，请根据自身系统安装：[官方安装文档](https://docs.mitmproxy.org/stable/overview-installation/)。并需要对系统和浏览器安装SSL/TLS证书来实现HTTPS的攻击：[官方证书安装文档](https://docs.mitmproxy.org/stable/concepts-certificates/)。
2. 在浏览器中安装proxy插件（如SwitchyOmega），并对域名`*.dnvod.tv`的所有http(s)流量指向本地proxy（`localhost:8899`）。具体设置方法请参考插件的文档。`proxy.pac`可用于自动配置代理，最新的pac文件可以通过`https://raw.githubusercontent.com/GreatYYX/dnvod-ad-killer/master/proxy.pac`获取。
3. `mitmdump -p 8899 -s call_killer.py`。 使用前务必清除浏览器缓存。

# 历史版本

- 2019以前的版本
    - 思路：[http://blog.yyx.me/posts/dnvod-ad-killer](http://blog.yyx.me/posts/dnvod-ad-killer)
    - 代码：[https://github.com/GreatYYX/dnvod-ad-killer/tree/v1](https://github.com/GreatYYX/dnvod-ad-killer/tree/v1)

# 维护

精力有限，欢迎各种fork和pull request。
